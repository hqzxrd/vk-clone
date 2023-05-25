import { Module } from '@nestjs/common';
import { LikeService } from './service/like.service';
import { LikeController } from './like.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LikeEntity } from './entities/like.entity';

@Module({
  controllers: [LikeController],
  providers: [LikeService],
  imports: [
    TypeOrmModule.forFeature([LikeEntity])
  ],
  exports: [LikeService]
})
export class LikeModule {}
