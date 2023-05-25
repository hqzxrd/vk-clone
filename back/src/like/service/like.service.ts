import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateLikeDto } from '../dto/create-like.dto';
import { UpdateLikeDto } from '../dto/update-like.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { LikeEntity } from '../entities/like.entity';
import { Repository } from 'typeorm';
import { LikeType } from '../like.enum';

@Injectable()
export class LikeService {
  constructor(
    @InjectRepository(LikeEntity) private readonly likeRepository: Repository<LikeEntity>
  ) {}

  createLikeToComment(createLikeDto: CreateLikeDto) {
    return 'This action adds a new like';
  }

  findAll() {
    return `This action returns all like`;
  }

  update(id: number, updateLikeDto: UpdateLikeDto) {
    return `This action updates a #${id} like`;
  }

  async remove(id: number, userId: number) {
    const like = await this.likeRepository.findOneBy({id, user: {id: userId}})
    if(!like) throw new BadRequestException()
    this.likeRepository.remove(like)
  }

  async likePost(userId: number, postId: number) {
    const like = this.likeRepository.create({type: LikeType.POST, post: {id: postId}, user: {id: userId}})
    return await this.likeRepository.save(like)
  }

  async likeComment(userId: number, commentId: number) {
    const like = this.likeRepository.create({type: LikeType.COMMENT, comment: {id: commentId}, user: {id: userId}})
    return await this.likeRepository.save(like)
  }
}
