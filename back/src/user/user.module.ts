import { Module, forwardRef } from '@nestjs/common';
import { UserService } from './service/user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { DropboxModule } from 'src/dropbox/dropbox.module';
import { FriendModule } from 'src/friend/friend.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    DropboxModule,
    forwardRef(() => FriendModule)
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule {}
