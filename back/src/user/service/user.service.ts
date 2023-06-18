import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';
import { FindOptionsSelect, Repository } from 'typeorm';
import { DropboxService } from 'src/dropbox/dropbox.service';
import { UpdateUserDto } from '../dto/update-user.dto';
import { RegistrationDto } from 'src/auth/dto/registration.dto';
import { MulterFile } from '@webundsoehne/nest-fastify-file-upload';
import { USER_NOT_FOUND } from '../constants/user.error.constants';
import { FriendRequestType } from 'src/friend/friend-request.enum';
import { FriendRequestService } from 'src/friend/service/friend-request.service';
import { Relationship } from '../relationship.enum';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
    private readonly dropboxService: DropboxService,
    private readonly friendRequestService: FriendRequestService
  ){}

  readonly returnBaseKeyUser: FindOptionsSelect<UserEntity> = {
    id: true, 
    name: true,
    surname: true,
    nickname: true,
    avatar: true,
    status: true,
    createDate: true,
    birthday: true,
    city: true,
    gender: true
}
  
  async byEmail(email: string) {
    const user = await this.userRepository.findOneBy({email})
    return user
  }

  async byId(id: number) {
    const user = await this.userRepository.findOne({
      where: {id},
      select: this.returnBaseKeyUser
    }) 
    return user
  }

  async profileById(id: number, userId?: number) {
    const selectUser = Object.keys(this.returnBaseKeyUser).map(key => `user.${key}`);
    const profileUser = await this.userRepository.createQueryBuilder('user')
          .select(selectUser)
          .loadRelationCountAndMap('user.countFriends', 'user.friends')
          .loadRelationCountAndMap('user.countIncomingRequests', 'user.incomingRequests')
          .leftJoin('user.friends', 'friends')
          .addSelect('friends.id')
          .where('user.id = :id', { id })
          .getOne()
  
    let typeRelationship: Relationship = Relationship.NONE

    if(userId && userId !== id) {
      const user = profileUser.friends.find(friend => friend.id === userId)
      if(user) {
        typeRelationship = Relationship.FRIEND
      }else {
        const typeRequest = await this.friendRequestService.getTypeRequest(id, userId)
        typeRelationship = typeRequest
      }
    }

    delete profileUser.friends

    return {...profileUser, typeRelationship}
  }

  async create(dto: RegistrationDto) {
    const user = this.userRepository.create({...dto})
    return await this.userRepository.save(user)
  }

  async getAll() {
    const users = await this.userRepository.find({
      select: this.returnBaseKeyUser
    })
    return users
  }

  async update(id: number, dto: UpdateUserDto, file?: MulterFile) {
    const user = await this.byId(id)
    if(!user) throw new UnauthorizedException()

    if(file) {
      if(user.avatar) this.dropboxService.remove(user.avatar)
      let url: string
      await Promise.all(url = (await this.dropboxService.uploadFile(file)).url)
      dto.avatar = url
    }
    
    const updatedUser = await this.userRepository.save({...user, ...dto})
    delete updatedUser.code
    delete updatedUser.updateDate
    return updatedUser
  }

  async deleteAvatar(id: number){
    const user = await this.byId(id)
    if(!user) throw new UnauthorizedException()
    if(user.avatar) {
      this.dropboxService.remove(user.avatar)
    }
    user.avatar = null
    await this.userRepository.save(user)
  }

  async getFriends(userId: number, page: number, count: number) {
    const data: any = await this.userRepository.createQueryBuilder('user')
          .select('user.id')
          .loadRelationCountAndMap('user.countFriends', 'user.friends')
          .where("user.id = :id", { id: userId })
          .getOne()

    if(!data) throw new BadRequestException(USER_NOT_FOUND)


    const friends = await this.userRepository.query(
      `SELECT * FROM users U
       WHERE U.id <> $1
          AND EXISTS(
            SELECT *
            FROM friend F
            WHERE (F."usersId_1" = $1 AND F."usersId_2" = U.id )
            OR (F."usersId_2" = $1 AND F."usersId_1" = U.id )
            OFFSET $2 LIMIT $3
          ); `,
      [userId, page * count - count, count],
    );

    return [friends, data.countFriends]
  }

  async getFriendRequest(id: number, type: FriendRequestType, page: number, count: number) {
    return await this.friendRequestService.getFriendRequest(id, type, page, count)
  }

  async findFriend(userId: number, friendId: number) {
    const user = await this.userRepository.findOne({
      where: {id: userId, friends: {id: friendId}}
    })
    return user
  }

  // ! 
  async addFriend(firstUserId: number, secondUserId: number) {
    const firstUser = await this.userRepository.findOne({where: {id: firstUserId}, relations: {friends: true}})
    const secondUser = await this.userRepository.findOne({where: {id: secondUserId}, relations: {friends: true}})

    firstUser.friends.push(secondUser)
    secondUser.friends.push(firstUser)

    await this.userRepository.save([firstUser, secondUser])
  }

  // !  
  async removeFriend(firstUserId: number, secondUserId: number) {
    const firstUser = await this.userRepository.findOne({where: {id: firstUserId}, relations: {friends: true}})
    const secondUser = await this.userRepository.findOne({where: {id: secondUserId}, relations: {friends: true}})

    firstUser.friends = firstUser.friends.filter(user => user.id !== secondUserId)
    secondUser.friends = secondUser.friends.filter(user => user.id !== firstUserId)

    await this.userRepository.save([firstUser, secondUser])
  }
}
