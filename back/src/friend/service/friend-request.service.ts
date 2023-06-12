import { BadRequestException, Inject, Injectable, forwardRef } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FriendRequestEntity } from "../entities/friend-request.entity";
import { FindOptionsSelect, Repository } from "typeorm";
import { FriendRequestType } from "../friend-request.enum";
import { UserEntity } from "src/user/entities/user.entity";
import { REQUEST_NOT_FOUND } from "../constants/friend.error.constants";
import { UserService } from "src/user/service/user.service";

@Injectable()
export class FriendRequestService {
    constructor(
        @InjectRepository(FriendRequestEntity) private readonly friendRequestRepository: Repository<FriendRequestEntity>,
        @Inject(forwardRef(() => UserService))
        private readonly userService: UserService
    ){}

    async createRequest(fromUserId: number, toUserId: number) {
        const dto = {fromUser: {id: fromUserId}, toUser: {id: toUserId}}
        const oldFriendRequest = await this.friendRequestRepository.findOneBy(dto)
        if(oldFriendRequest) return oldFriendRequest

        const friendRequest = this.friendRequestRepository.create(dto)
        return await this.friendRequestRepository.save(friendRequest)
    }

    async removeFriendRequest(fromUserId: number, toUserId: number) {
        const dto = {fromUser: {id: fromUserId}, toUser: {id: toUserId}}
        const friendRequest = await this.friendRequestRepository.findOneBy(dto)
      
        if(!friendRequest) throw new BadRequestException(REQUEST_NOT_FOUND)

        await this.friendRequestRepository.remove(friendRequest)
    }

    async getFriendRequest(id: number, type: FriendRequestType, page: number, count: number) {
        let friendRequestAndCount
        const paginationOptions = {
            take: count,
            skip: page * count - count
        }
        if(type === FriendRequestType.INCOMING) {
            const friendRequest = await this.friendRequestRepository.findAndCount({
                ...paginationOptions,
                relations: {toUser: true},
                where: {fromUser: {id}},
                select: { toUser: this.userService.returnBaseKeyUser }
            })
            friendRequestAndCount = [friendRequest[0].map(request => request.toUser), friendRequest[1]]
        }else {
            const friendRequest = await this.friendRequestRepository.findAndCount({
                ...paginationOptions,
                relations: {fromUser: true},
                where: {toUser: {id}},
                select: { fromUser: this.userService.returnBaseKeyUser }
            })
            friendRequestAndCount = [friendRequest[0].map(request => request.fromUser), friendRequest[1]]
        }

        return friendRequestAndCount
    }
}