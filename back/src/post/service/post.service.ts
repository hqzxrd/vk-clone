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

@Injectable()
export class PostService {

  constructor(
    @InjectRepository(PostEntity) private readonly postRepository: Repository<PostEntity>,
    private readonly dropboxService: DropboxService,
    private readonly likeService: LikeService,
    private readonly userService: UserService,
    private readonly notificationService: NotificationService
  ) {}

  
  async create(id: number, dto: CreatePostDto, photos: MulterFile[]) {

    photos.forEach(photo => {
       // * for every item to be unique
      const index = photos.indexOf(photo)
      photo.originalname = index + photo.originalname
    })

    const urlsObject: Array<{url: string, originalname: string}> = []
    await Promise.all(photos.map(async (photo) => {
      const data = await this.dropboxService.uploadFile(photo)
      urlsObject.push(data)
    }))

    const urls: string[] = []
    photos.forEach(photo => {
      urlsObject.forEach(urlObject => {
        if(photo.originalname === urlObject.originalname) urls.push(urlObject.url)
      })
    })

    const post = this.postRepository.create({...dto, author: {id}, photos: urls})
    return await this.postRepository.save(post)
  }

  async findAll(page: number, count: number, queryUserId?: number, userId?: number) {
    const selectUser = Object.keys(this.userService.returnBaseKeyUser).map(key => `author.${key}`);

    const postsAndCount = await this.postRepository
      .createQueryBuilder('post')
      .leftJoin('post.author', 'author')
      .addSelect(selectUser)
      .loadRelationCountAndMap('post.countComments', 'post.comments')
      .loadRelationCountAndMap('post.countLikes', 'post.likes')
      .take(count)
      .skip(page * count - count)
      .orderBy('post.createDate', 'DESC')
      .where(queryUserId ? 'author.id = :id': '' , { id: queryUserId })
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
      urlsForDelete.forEach((path) => this.dropboxService.remove(path))
    }
    
    if(files.length) {
      files.forEach(photo => {
        // * for every item to be unique
          const index = files.indexOf(photo)
          photo.originalname = index + photo.originalname
      })
      const urlsObject: Array<{url: string, originalname: string}> = []
      await Promise.all(files.map(async (file) => {
        const data =  await this.dropboxService.uploadFile(file)
        urlsObject.push(data)
      }))

      files.forEach(file => {
        urlsObject.forEach(urlObject => {
          if(file.originalname === urlObject.originalname) newPhotos.push(urlObject.url)
        })
      })
    }

    return await this.postRepository.save({...post, ...updatePostDto, photos: newPhotos})
  }

  async remove(id: number, authorId: number) {
    const post = await this.postRepository.findOne({
      where: {id, author: {id: authorId}}
    })
    if(!post) throw new NotFoundException()
    post.photos.forEach((path) => this.dropboxService.remove(path))
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
   const notification = await this.notificationService.getOne({...dto, type: NotificationType.LIKE, column_type: 'post', column_id: dto.postId})
   if(!notification) await this.sendNotification({...dto, type: NotificationType.LIKE})
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


  getParamsFind(): FindOneOptions<PostEntity> {
    return {
      relations: ['author', 'likes', 'likes.user', 'comments', 'comments.author'],
      select: {
        author: {
          id: true, 
          avatar: true, 
          name: true, 
          surname: true, 
          nickname: true
        },
        likes: {
          id: true,
          user: {id: true}
        },
        comments: {
          id: true,
          author: {id: true}
        }
      }
    }
  }
}
