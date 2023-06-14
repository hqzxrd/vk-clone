import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LikeEntity } from '../entities/like.entity';
import { Repository } from 'typeorm';
import { LikeType } from '../like.enum';

@Injectable()
export class LikeService {
  constructor(
    @InjectRepository(LikeEntity) private readonly likeRepository: Repository<LikeEntity>
  ) {}

  findAll() {

  }

  async remove(id: number, userId: number) {
    const like = await this.likeRepository.findOneBy({id, user: {id: userId}})
    if(!like) throw new BadRequestException()
    this.likeRepository.remove(like)
  }

  async like(userId: number, columnId: number, columnType: LikeType ){
    const findOrCreateObject = {
      type: columnType,
      [columnType]: {id: columnId},
      user: {id: userId}
    }
    
    const oldLike = await this.likeRepository.findOneBy(findOrCreateObject)

    let isLike: boolean
    if(oldLike) {
      await this.likeRepository.remove(oldLike)
      isLike = false
    }else {
      const like = this.likeRepository.create(findOrCreateObject)
      await this.likeRepository.save(like)
      isLike = true
    }
    
    const countLikes = await this.likeRepository.countBy({type: columnType, [columnType]: {id: columnId}})
    return {isLike, countLikes}
  }

  async getIsLike(userId: number, columnId: number, columnType: LikeType ) {
    const findOrCreateObject = {
      type: columnType,
      [columnType]: {id: columnId},
      user: {id: userId}
    }

    const like = await this.likeRepository.findOneBy(findOrCreateObject)
    return !!like
  }
}
