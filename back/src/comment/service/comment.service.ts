import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCommentDto } from '../dto/create-comment.dto';
import { UpdateCommentDto } from '../dto/update-comment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CommentEntity } from '../entities/comment.entity';
import { Like, Repository } from 'typeorm';
import { PostService } from 'src/post/service/post.service';
import { LikeService } from 'src/like/service/like.service';
import { LikeType } from 'src/like/like.enum';
import { UserService } from 'src/user/service/user.service';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(CommentEntity) private readonly commentRepository: Repository<CommentEntity>,
    private readonly postService: PostService,
    private readonly likeService: LikeService,
    private readonly userService: UserService
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
    const comment = await this.commentRepository.findOne({
      where: {id},
      relations: ['author', 'post', 'post.author'],
      select: {
        author: {id: true},
        post: {id: true, author: {id: true}}
      }
    })
    if(!comment) throw new NotFoundException()

    const postAuthorId = comment.post.author.id
    const authorCommentId = comment.author.id
    if(!(authorCommentId === userId || userId === postAuthorId)) throw new ForbiddenException()

    this.commentRepository.remove(comment)
  }

  async findOne(id: number, userId?: number) {
    const selectUser = Object.keys(this.userService.returnBaseKeyUser).map(key => `author.${key}`);
    const comment = await this.commentRepository
      .createQueryBuilder('comment')
      .leftJoin('comment.post', 'post')
      .leftJoin('comment.author', 'author')
      .addSelect(selectUser)
      .addSelect('post.id')
      .loadRelationCountAndMap('comment.countLikes', 'comment.likes')
      .where('comment.id = :id', { id })
      .getOne();

    if(!comment) throw new NotFoundException()
    let isLike = false;
    if (userId) {
      isLike = await this.getIsLike(id, userId);
    }
    return { ...comment, isLike };
  }

  async findAllByPostId(page: number, count: number, postId: number, userId?: number) {
    const selectUser = Object.keys(this.userService.returnBaseKeyUser).map(key => `author.${key}`);
    
    const commentsAndCount = await this.commentRepository
      .createQueryBuilder('comment')
      .leftJoin('comment.author', 'author')
      .leftJoin('comment.post', 'post')
      .addSelect(selectUser)
      .addSelect('post.id')
      .loadRelationCountAndMap('comment.countLikes', 'comment.likes')
      .take(count)
      .skip(page * count - count)
      .orderBy('comment.createDate', 'DESC')
      .where('post.id = :id', { id: postId })
      .getManyAndCount()

      const comments = await Promise.all(commentsAndCount[0].map(async comment => {
        let isLike = false
        if(userId) isLike = await this.getIsLike(comment.id, userId);
        return {...comment, isLike}
      }))

      return [comments, commentsAndCount[1]]
  }

  async getIsLike(commentId: number, userId: number) {
    return await this.likeService.getIsLike(userId, commentId, LikeType.COMMENT)
  }
  
  async likeComment(userId: number, commentId: number) {
      const comment = await this.commentRepository.findOneBy({id: commentId})
      if(!comment) throw new NotFoundException()
      return await this.likeService.like(userId, commentId, LikeType.COMMENT)
  }
}
