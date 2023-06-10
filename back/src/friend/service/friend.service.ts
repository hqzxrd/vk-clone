import { BadRequestException, Injectable } from '@nestjs/common';
import { FriendRequestService } from './friend-request.service';
import { UserService } from 'src/user/service/user.service';


@Injectable()
export class FriendService {
  constructor(
    private readonly friendRequestService: FriendRequestService,
    private readonly userService: UserService
  ) {}

    async sendRequest(fromUserId: number, toUserId: number) {
      const friend = await this.checkFriends(fromUserId, toUserId)
      console.log(friend)
      if(friend) throw new BadRequestException('Пользователь уже в друзьях')
      
      const friendRequest = await this.friendRequestService.createRequest(fromUserId, toUserId)
      // * notification 
      return friendRequest
    }

    async responseOnFriendRequest(fromUserId: number, toUserId: number, isAccept: boolean) {
      await this.friendRequestService.answerRequest(fromUserId, toUserId, isAccept)
    }


    async addFriend(firstUserId: number, secondUserId: number) {
      const friend = await  this.checkFriends(firstUserId, secondUserId)
      if(friend) throw new BadRequestException('Пользователь уже в друзьях')
      await this.userService.addFriend(firstUserId, secondUserId)
    }

    async removeFriend(fromUserId: number, toUserId: number) {
      const friend = await this.checkFriends(fromUserId, toUserId)
      if(!friend) throw new BadRequestException('Пользователя нет в друзьях')
      await this.userService.removeFriend(fromUserId, toUserId)
      await this.friendRequestService.createRequest(fromUserId, toUserId)
    }

    async checkFriends(fromUserId: number, toUserId: number) {
      const fromUser = await this.userService.byId(fromUserId)
      const toUser = await this.userService.byId(toUserId)

      if(!fromUser || !toUser) throw new BadRequestException()

      const user = await this.userService.findFriend(fromUserId, toUserId)
      return user
    }

}
