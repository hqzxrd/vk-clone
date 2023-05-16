import { Module } from '@nestjs/common';
import { PostService } from './service/post.service';
import { PostController } from './post.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostEntity } from './entities/post.entity';
import { DropboxModule } from 'src/dropbox/dropbox.module';
import { UserModule } from 'src/user/user.module';

@Module({
  controllers: [PostController],
  imports: [
    TypeOrmModule.forFeature([PostEntity]),
    DropboxModule,
    UserModule
  ],
  providers: [PostService]
})
export class PostModule {}
