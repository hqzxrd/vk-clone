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

@Injectable()
export class PostService {

  constructor(
    @InjectRepository(PostEntity) private readonly postRepository: Repository<PostEntity>,
    private readonly dropboxService: DropboxService,
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

  async findAll(page: number, count: number, userId?: number) {
    const posts = await this.postRepository.findAndCount({
      take: count, 
      skip: count * page - count,
      where: {author: {id: userId}},
      order: {createDate: 'DESC'},
      relations: {author: true},
      select: {
        author: {
          id: true, 
          avatar: true, 
          name: true, 
          surname: true,
          nickname: true
        }
      }
    })
    return posts
  }
  

  async findOne(id: number) {
    const post = await this.postRepository.findOne({
      where: {id},
      relations: {author: true},
      select: {
        author: {
          id: true, 
          avatar: true, 
          name: true, 
          surname: true, 
          nickname: true
        }
      }
    })
    return post
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
      console.log('true')
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
}
