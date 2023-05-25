import { Module } from '@nestjs/common';
import { CommentService } from './service/comment.service';
import { CommentController } from './comment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentEntity } from './entities/comment.entity';
import { PostModule } from 'src/post/post.module';
import { LikeModule } from 'src/like/like.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([CommentEntity]),
    PostModule,
    LikeModule
  ],
  controllers: [CommentController],
  providers: [CommentService]
})
export class CommentModule {}
