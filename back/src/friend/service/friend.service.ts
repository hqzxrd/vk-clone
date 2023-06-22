import { BadRequestException, Injectable } from '@nestjs/common';
import { FriendRequestService } from './friend-request.service';
import { UserService } from 'src/user/service/user.service';
import { USER_ALREADY_FRIENDS, USER_NOT_FRIENDS } from '../constants/friend.error.constants';
import { NotificationType } from 'src/notification/enums/notification.type.enum';
import { NotificationService } from 'src/notification/service/notification.service';


@Injectable()
export class FriendService {
  constructor(
    private readonly friendRequestService: FriendRequestService,
    private readonly userService: UserService,
    private readonly notificationService: NotificationService
  ) {}

    async sendRequest(fromUserId: number, toUserId: number) {
      const friend = await this.checkFriends(fromUserId, toUserId)
      if(friend) throw new BadRequestException(USER_ALREADY_FRIENDS)

      const friendRequest = await this.friendRequestService.createRequest(fromUserId, toUserId)

      // * notification
      await this.sendNotificationRequestFriend(toUserId, fromUserId)

      return friendRequest
    }

    async responseOnFriendRequest(fromUserId: number, toUserId: number, isAccept: boolean) {
      await this.friendRequestService.removeFriendRequest(fromUserId, toUserId)
      // * notification
      await this.deleteFriendNotification(toUserId, fromUserId, NotificationType.FRIEND_REQUEST)

      if(isAccept) {
        await this.addFriend(fromUserId, toUserId)
        // * notification
        await this.sendNotificationAccessRequest(fromUserId, toUserId)
      }
    }

    async addFriend(firstUserId: number, secondUserId: number) {
      const friend = await  this.checkFriends(firstUserId, secondUserId)
      if(friend) throw new BadRequestException(USER_ALREADY_FRIENDS)
      await this.userService.addFriend(firstUserId, secondUserId)
    }

    async removeFriend(fromUserId: number, toUserId: number) {
      const friend = await this.checkFriends(fromUserId, toUserId)
      if(!friend) throw new BadRequestException(USER_NOT_FRIENDS)
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

    async cancelRequest(fromUserId: number, toUserId: number) {
      await this.friendRequestService.removeFriendRequest(fromUserId, toUserId)
      // * notification
      await this.deleteFriendNotification(toUserId, fromUserId, NotificationType.FRIEND_REQUEST)
    }

    private async sendNotificationRequestFriend(userId: number, fromUserId: number) {
      await this.notificationService.send({userId, fromUserId, type: NotificationType.FRIEND_REQUEST})
    }

    private async sendNotificationAccessRequest(userId: number, fromUserId: number) {
      await this.notificationService.send({userId, fromUserId, type: NotificationType.ACCESS_REQUEST})
    }

    private async deleteFriendNotification(userId: number, fromUserId: number, type: NotificationType.FRIEND_REQUEST | NotificationType.ACCESS_REQUEST) {
      await this.notificationService.delete(userId, fromUserId, type)
    }

}
