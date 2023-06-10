import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Query, ParseBoolPipe, HttpCode, HttpStatus } from '@nestjs/common';
import { FriendService } from './service/friend.service';
import { AccessJwtGuard } from 'src/auth/decorators/access-jwt.decorator';
import { User } from 'src/user/decorators/user.decorator';

@AccessJwtGuard()
@Controller('friend')
export class FriendController {
  constructor(private readonly friendService: FriendService) {}

  @Get('send/:userId')
  sendFriendRequest(
    @User('id') fromUserId: number,
    @Param('userId', ParseIntPipe) toUserId: number
  ) {
    return this.friendService.sendRequest(fromUserId, toUserId) 
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Get('response/:userId')
  responseOnFriendRequest(
    @User('id') toUserId: number,
    @Param('userId', ParseIntPipe) fromUserId: number,
    @Query('isAccept', ParseBoolPipe) isAccept: boolean 
  ) {
    return this.friendService.responseOnFriendRequest(fromUserId, toUserId, isAccept)
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('/:userId')
  removeFriend(
    @User('id') userId: number,
    @Param('userId', ParseIntPipe) id: number,
  ) {
    return this.friendService.removeFriend(userId, id)
  }

}
