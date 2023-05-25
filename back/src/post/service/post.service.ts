import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from '../dto/create-post.dto';
import { UpdatePostDto } from '../dto/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PostEntity } from '../entities/post.entity';
import { Repository } from 'typeorm';
import { MulterFile } from '@webundsoehne/nest-fastify-file-upload';
import { DropboxService } from 'src/dropbox/dropbox.service';
import { UserService } from 'src/user/user.service';
import { arrayComparison } from 'src/utils/array-comparison';
import { LikeService } from 'src/like/service/like.service';
import { LikeType } from 'src/like/like.enum';

@Injectable()
export class PostService {

  constructor(
    @InjectRepository(PostEntity) private readonly postRepository: Repository<PostEntity>,
    private readonly dropboxService: DropboxService,
    private readonly likeService: LikeService,
    private readonly userService: UserService
  ) {}

  async create(id: number, dto: CreatePostDto, photos: MulterFile[]) {
    const urls = []
    await Promise.all(photos.map(async (photo) => {
      const url =  await this.dropboxService.uploadFile(photo)
      urls.push(url)
    }))

    const post = this.postRepository.create({...dto, author: {id}, photos: urls})
    return await this.postRepository.save(post)
  }

  async findAll(page: number, count: number, queryUserId?: number, userId?: number) {
    const postsAndCount = await this.postRepository.findAndCount({
      relations: ['author', 'likes', 'likes.user'],
      take: count, 
      skip: count * page - count,
      where: {author: {id: queryUserId}},
      order: {createDate: 'DESC'},
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
          user: { id: true }
        }
      }
    })

    const posts = postsAndCount[0].map(post => {
      let isLike = false
      if(userId) {
        const likeOfUser = post.likes.find(like => like.user.id === userId)
        isLike = !!likeOfUser
      }
      const count = post.likes.length
      delete post.likes
      return {...post, likes: count, isLike}
    })

    return [posts, postsAndCount[1]]
  }
  

  async findOne(id: number, userId?: number) {
    const post = await this.postRepository.findOne({
      where: {id},
      relations: ['author', 'likes', 'likes.user'],
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
        }
      }
    })
    let isLike = false
    if(userId) {
      const likeOfUser = post.likes.find(like => like.user.id === userId)
      isLike = !!likeOfUser
    }
    const count = post.likes.length
    delete post.likes
    return {...post, likes: count, isLike}
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
      await Promise.all(files.map(async (file) => {
        const url =  await this.dropboxService.uploadFile(file)
        newPhotos.push(url)
      }))
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
    const post = await this.postRepository.findOneBy({id: postId})
    if(!post) throw new NotFoundException()
    return await this.likeService.like(userId, postId, LikeType.POST)
  }
}
