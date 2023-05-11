import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { DropboxModule } from 'src/dropbox/dropbox.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    DropboxModule
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule {}
