import { BadRequestException, Inject, Injectable, forwardRef } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FriendRequestEntity } from "../entities/friend-request.entity";
import { Repository } from "typeorm";
import { FriendService } from "./friend.service";

@Injectable()
export class FriendRequestService {
    constructor(
        @InjectRepository(FriendRequestEntity) private readonly friendRequestRepository: Repository<FriendRequestEntity>,
        @Inject(forwardRef(() => FriendService))
        private readonly friendService: FriendService
    ){}

    async createRequest(fromUserId: number, toUserId: number) {
        const dto = {fromUser: {id: fromUserId}, toUser: {id: toUserId}}
        const oldFriendRequest = await this.friendRequestRepository.findOneBy(dto)
        if(oldFriendRequest) return oldFriendRequest

        const friendRequest = this.friendRequestRepository.create(dto)
        return await this.friendRequestRepository.save(friendRequest)
    }

    async answerRequest(fromUserId: number, toUserId: number, isAccept: boolean) {
        const dto = {fromUser: {id: fromUserId}, toUser: {id: toUserId}}
        const friendRequest = await this.friendRequestRepository.findOneBy(dto)
         // * такой заявки нет
        if(!friendRequest) throw new BadRequestException()

        await this.friendRequestRepository.remove(friendRequest)
        if(isAccept) await this.friendService.addFriend(fromUserId, toUserId)

    }
}