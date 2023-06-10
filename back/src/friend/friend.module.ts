import { Module } from '@nestjs/common';
import { FriendService } from './service/friend.service';
import { FriendController } from './friend.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FriendRequestEntity } from './entities/friend-request.entity';
import { FriendRequestService } from './service/friend-request.service';
import { UserModule } from 'src/user/user.module';

@Module({
  controllers: [FriendController],
  providers: [FriendService, FriendRequestService],
  imports: [
    TypeOrmModule.forFeature([FriendRequestEntity]),
    UserModule
  ]
})
export class FriendModule {}
