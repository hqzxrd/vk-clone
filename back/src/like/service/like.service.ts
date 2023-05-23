import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateLikeDto } from '../dto/create-like.dto';
import { UpdateLikeDto } from '../dto/update-like.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { LikeEntity } from '../entities/like.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LikeService {
  constructor(
    @InjectRepository(LikeEntity) private readonly likeRepository: Repository<LikeEntity>
  ) {}

  create(createLikeDto: CreateLikeDto) {
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
}
