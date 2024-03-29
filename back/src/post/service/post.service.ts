import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from '../dto/create-post.dto';
import { UpdatePostDto } from '../dto/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PostEntity } from '../entities/post.entity';
import { FindOneOptions, Repository } from 'typeorm';
import { MulterFile } from '@webundsoehne/nest-fastify-file-upload';
import { DropboxService } from 'src/dropbox/dropbox.service';
import { UserService } from 'src/user/service/user.service';
import { arrayComparison } from 'src/utils/array-comparison';
import { LikeService } from 'src/like/service/like.service';
import { LikeType } from 'src/like/like.enum';
import { NotificationService } from 'src/notification/service/notification.service';
import { SendNotificationPostDto } from '../dto/send-notification.post.dto';
import { NotificationType } from 'src/notification/enums/notification.type.enum';
import { FileService } from 'src/file/file.service';
import { getUserKey } from 'src/utils/get-user-key';

@Injectable()
export class PostService {

  constructor(
    @InjectRepository(PostEntity) private readonly postRepository: Repository<PostEntity>,
    private readonly dropboxService: DropboxService,
    private readonly likeService: LikeService,
    private readonly userService: UserService,
    private readonly notificationService: NotificationService,
    private readonly fileService: FileService
  ) {}

  
  async create(id: number, dto: CreatePostDto, photos: MulterFile[]) {
    const urls: string[] = []

    for(const photo of photos) {
      const url = await this.fileService.saveFile(photo)
      urls.push(url)
    }

    console.log(urls)
    const post = this.postRepository.create({...dto, author: {id}, photos: urls})
    return await this.postRepository.save(post)
  }

  async findAll(page: number, count: number, queryUserKey?: string, userId?: number) {
    const selectUser = Object.keys(this.userService.returnBaseKeyUser).map(key => `author.${key}`);

    let userKey
    if(queryUserKey) {
      userKey = getUserKey(queryUserKey)
    }

    const postsAndCount = await this.postRepository
      .createQueryBuilder('post')
      .leftJoin('post.author', 'author')
      .addSelect(selectUser)
      .loadRelationCountAndMap('post.countComments', 'post.comments')
      .loadRelationCountAndMap('post.countLikes', 'post.likes')
      .take(count)
      .skip(page * count - count)
      .orderBy('post.createDate', 'DESC')
      .where(
        userKey ? `author.${(typeof userKey === 'number') ? 'id' : 'nickname'} = :key`: '' , 
        { key:  userKey}
        )
      .getManyAndCount()

      const posts = await Promise.all(postsAndCount[0].map(async post => {
        let isLike = false
        if(userId) isLike = await this.getIsLike(post.id, userId);
        return {...post, isLike}
      }))

      return [posts, postsAndCount[1]]
  }
  

  async findOne(id: number, userId?: number) {
    const selectUser = Object.keys(this.userService.returnBaseKeyUser).map(key => `author.${key}`);
    const post = await this.postRepository
      .createQueryBuilder('post')
      .leftJoin('post.author', 'author')
      .addSelect(selectUser)
      .loadRelationCountAndMap('post.countComments', 'post.comments')
      .loadRelationCountAndMap('post.countLikes', 'post.likes')
      .where('post.id = :id', { id })
      .getOne();

    if(!post) throw new NotFoundException()
    let isLike = false;
    if (userId) {
      isLike = await this.getIsLike(id, userId);
    }
    return { ...post, isLike };
    
  }

  async update(id: number, userId: number,  updatePostDto: UpdatePostDto, files: MulterFile[]) {
    const post = await this.postRepository.findOne({
      where: {id, author: {id: userId}}
    })
    if(!post) throw new NotFoundException()

    const oldPhotos = post.photos
    const newPhotos = updatePostDto.photos

    const urlsForDelete = arrayComparison(oldPhotos, newPhotos)
    if(urlsForDelete.length) {
      urlsForDelete.forEach((path) => this.fileService.deleteFile(path))
    }
    
    if(files.length) {
      for(const file of files) {
        const url = await this.fileService.saveFile(file)
        newPhotos.push(url)
      }
    }

    return await this.postRepository.save({...post, ...updatePostDto, photos: newPhotos})
  }

  async remove(id: number, authorId: number) {
    const post = await this.postRepository.findOne({
      where: {id, author: {id: authorId}}
    })
    if(!post) throw new NotFoundException()
    post.photos.forEach((path) => this.fileService.deleteFile(path))
    await this.postRepository.remove(post)
  }

  async likePost(userId: number, postId: number) {
    const post = await this.postRepository.findOne({
      where: {id: postId},
      select: {id: true, author: {id: true}},
      relations: {author: true}
    })
    if(!post) throw new NotFoundException()
    const like = await this.likeService.like(userId, postId, LikeType.POST)

    if(like.isLike) {
      await this.sendLikeNotification({postId, fromUserId: userId, userId: post.author.id})
    }
    return like
  }
  
  async sendLikeNotification(dto: Omit<SendNotificationPostDto, 'type'>) {
   const notification = await this.notificationService.getOne({...dto, type: NotificationType.LIKE_POST, column_type: 'post', column_id: dto.postId})
   if(!notification) await this.sendNotification({...dto, type: NotificationType.LIKE_POST})
  }

  async sendNotification(dto: SendNotificationPostDto) {
    await this.notificationService.send({...dto, column_id: dto.postId, column_type: 'post'})
  }

  statisticsPost(post: PostEntity) {
    const countLikes = post.likes.length
    const countComments = post.comments.length
    delete post.likes
    delete post.comments

    return {...post, countLikes, countComments}
  }

  async getIsLike(postId: number, userId: number) {
   return await this.likeService.getIsLike(userId, postId, LikeType.POST)
  }


  async newsLine(userId: number, page: number, count: number) {
    const selectUser = Object.keys(this.userService.returnBaseKeyUser).map(key => `author.${key}`);
    const friendIds = await this.userService.getFriendIds(userId)
    const postsAndCount = await this.postRepository
      .createQueryBuilder('post')
      .leftJoin('post.author', 'author')
      .addSelect(selectUser)
      .loadRelationCountAndMap('post.countComments', 'post.comments')
      .loadRelationCountAndMap('post.countLikes', 'post.likes')
      .take(count)
      .skip(page * count - count)
      .orderBy('post.createDate', 'DESC')
      .where('author.id IN (:...ids)', {ids: [...friendIds, userId]})
      .getManyAndCount()

      const posts = await Promise.all(postsAndCount[0].map(async post => {
        let isLike = false
        if(userId) isLike = await this.getIsLike(post.id, userId);
        return {...post, isLike}
      }))

      return [posts, postsAndCount[1]]
  }
}
