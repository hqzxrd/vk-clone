import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCommentDto } from '../dto/create-comment.dto';
import { UpdateCommentDto } from '../dto/update-comment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CommentEntity } from '../entities/comment.entity';
import { Repository } from 'typeorm';
import { PostService } from 'src/post/service/post.service';
import { LikeService } from 'src/like/service/like.service';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(CommentEntity) private readonly commentRepository: Repository<CommentEntity>,
    private readonly postService: PostService,
    private readonly likeService: LikeService
  ){}
  async create({text, postId}: CreateCommentDto, userId: number) {
     const post = await this.postService.findOne(postId)
    //  ! need set error
    if(!post) throw new BadRequestException()
    const comment = this.commentRepository.create({text, post: {id: postId}, author: {id: userId}})
    return await this.commentRepository.save(comment)
  }

  async update(id: number, updateCommentDto: UpdateCommentDto, userId: number) {
     console.log(updateCommentDto)
     const comment = await this.commentRepository.findOneBy({id, author: {id: userId}})
     if(!comment) throw new BadRequestException()
     return await this.commentRepository.save({...comment, ...updateCommentDto})
  }

  async remove(id: number, userId: number) {
    const comment = await this.commentRepository.findOneBy({id, author: {id: userId}})
    if(!comment) throw new BadRequestException()
    this.commentRepository.remove(comment)
  }

  async findOne(id: number) {
    const comment = await this.commentRepository.findOne({
      where: {id},
      relations: {post: true}
    }) 
    return comment
  }

  async findAllByPostId(page: number, count: number, postId?: number,) {
    const comment = await this.commentRepository.findAndCount({
      take: count, 
      skip: page * count - count,
      where: {post: {id: postId}},
      order: {createDate: 'DESC'},
      relations: {post: true},
    })
    return comment
  }
  
  async likeComment(userId: number, commentId: number) {
      const comment = await this.commentRepository.findOneBy({id: commentId})
      if(!comment) throw new NotFoundException()
      return await this.likeService.likeComment(userId, commentId)
  }
}
