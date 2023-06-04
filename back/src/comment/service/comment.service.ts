import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCommentDto } from '../dto/create-comment.dto';
import { UpdateCommentDto } from '../dto/update-comment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CommentEntity } from '../entities/comment.entity';
import { Repository } from 'typeorm';
import { PostService } from 'src/post/service/post.service';
import { LikeService } from 'src/like/service/like.service';
import { LikeType } from 'src/like/like.enum';

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
    const countComments = await this.commentRepository.countBy({post:{id: postId}})
    return {...await this.commentRepository.save(comment), countComments}
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

  async findOne(id: number, userId?: number) {
    const comment = await this.commentRepository.findOne({
      relations: ['post', 'likes', 'likes.user'],
      select: {
        likes: {id: true, user: {id: true}}
      },
      where: {id}
    })
    let isLike = false
    if(userId) {
      const likeOfUser = comment.likes.find(like => like.user.id === userId)
      isLike = !!likeOfUser
    }
    const count = comment.likes.length
    delete comment.likes
    return {...comment, likes: count, isLike}
  }

  async findAllByPostId(page: number, count: number, postId?: number, userId?: number) {
    const commentAndCount = await this.commentRepository.findAndCount({
      relations: ['post', 'likes', 'likes.user', 'author'],
      take: count, 
      skip: page * count - count,
      where: {post: {id: postId}},
      order: {createDate: 'DESC'},
      select: {
        likes: {id: true, user: {id: true}},
        author: {id: true, avatar: true, name: true, surname: true, nickname: true}
      }
    })

    const comments = commentAndCount[0].map(comment => {
      let isLike = false
      if(userId) {
        const likeOfUser = comment.likes.find(like => like.user.id === userId)
        isLike = !!likeOfUser
      }
      const count = comment.likes.length
      delete comment.likes
      return {...comment, likes: count, isLike}
    })

    return [comments, commentAndCount[1]]
  }
  
  async likeComment(userId: number, commentId: number) {
      const comment = await this.commentRepository.findOneBy({id: commentId})
      if(!comment) throw new NotFoundException()
      return await this.likeService.like(userId, commentId, LikeType.COMMENT)
  }
}
