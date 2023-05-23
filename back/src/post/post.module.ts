import { Module } from '@nestjs/common';
import { PostService } from './service/post.service';
import { PostController } from './post.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostEntity } from './entities/post.entity';
import { DropboxModule } from 'src/dropbox/dropbox.module';
import { UserModule } from 'src/user/user.module';
import { LikeModule } from 'src/like/like.module';

@Module({
  controllers: [PostController],
  imports: [
    TypeOrmModule.forFeature([PostEntity]),
    DropboxModule,
    UserModule,
    LikeModule,
  ],
  providers: [PostService],
  exports: [PostService]
})
export class PostModule {}
