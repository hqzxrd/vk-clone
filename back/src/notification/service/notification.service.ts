import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Subject } from 'rxjs';
import { NotificationEntity } from '../entities/notification.entity';
import { DeepPartial, FindOptionsWhere, Repository } from 'typeorm';
import { CreateNotificationDto } from '../dto/create-notification.dto';
import { NotificationType } from '../enums/notification.type.enum';
import { NotificationStatus } from '../enums/notification.status.enum';

@Injectable()
export class NotificationService {
  private notificationEvents: Record<string, Subject<unknown>> = {}

  constructor(
    @InjectRepository(NotificationEntity) private readonly notificationRepository: Repository<NotificationEntity>
  ) {}

  async handleConnection(id: number) {
    if(!this.notificationEvents[id]) {
      this.notificationEvents[id] = new Subject()
    }
    const count = await this.countNoRead(id)
    const countRequestFriendNotification = await this.countRequestFriendNotification(id)
    setTimeout(() => this.notificationEvents[id].next({ data: {count, countRequestFriendNotification} }), 0)
    return this.notificationEvents[id].asObservable();
  }

 async send(dto: CreateNotificationDto) {
    if(!this.notificationEvents[dto.userId] || (dto.userId === dto.fromUserId)) return
    const notification = await this.create(dto)
    const count = await this.countNoRead(dto.userId)
    const countRequestFriendNotification = await this.countRequestFriendNotification(dto.userId)
    this.notificationEvents[dto.userId].next({ data: { ...notification, count, countRequestFriendNotification } });
 }

 async sendCount(id: number) {
  if(!this.notificationEvents[id]) return
  const count = await this.countNoRead(id)
  const countRequestFriendNotification = await this.countRequestFriendNotification(id)
  this.notificationEvents[id].next({ data: {count, countRequestFriendNotification} })
 }

  private async create(createDto: CreateNotificationDto) {
    const dto: DeepPartial<NotificationEntity>= {
      user: {id: createDto.userId}, 
      fromUser: {id: createDto.fromUserId},
      type: createDto.type,
      [createDto.column_type]: {id: createDto.column_id}
    }
    if(createDto.type === NotificationType.MESSAGE) return dto
    const notification = this.notificationRepository.create({...dto})
    await this.notificationRepository.save(notification)
    return await this.byIdForReturn(notification.id)
  }

  async byIdForReturn(id: number) {
    const { fromUser, createDate, comment, post, status, type } = await this.notificationRepository.findOne({
      where: {id},
      relations: ['post', 'fromUser', 'comment', 'comment.post'],
      select: {
        fromUser: {id: true, surname: true, name: true, nickname: true, avatar: true},
        comment: {
          id: true,
          createDate: true,
          text: true,
          post: {id: true, createDate: true}
      }
      }
    })
    return {fromUser, status, type, createDate, comment, post}
  }

  private async countNoRead(id: number) {
    const count = await this.notificationRepository.countBy({
      status: NotificationStatus.NOT_READ,
      user: {id}
    })
    return count
  }

  private async countRequestFriendNotification(id: number) {
    const count = await this.notificationRepository.countBy({
      status: NotificationStatus.NOT_READ,
      type: NotificationType.FRIEND_REQUEST,
      user: {id}
    })
    return count
  }

  async delete(userId: number, fromUserId: number, type: NotificationType) {
    const notification = await this.notificationRepository.findOneBy({type, user: {id: userId}, fromUser: {id: fromUserId}})
    if(!notification) return
    await this.notificationRepository.remove(notification)
  }

  async getOne(dto: CreateNotificationDto) {
    const findDto: FindOptionsWhere<NotificationEntity> = {
      user: {id: dto.userId}, 
      fromUser: {id: dto.fromUserId},
      type: dto.type,
      [dto.column_type]: {id: dto.column_id}
    }
    const notification = await this.notificationRepository.findOne({
      where: findDto
    })
    return notification
  }

  async getAll(id: number, page: number, count: number) {
    const notificationsAndCount = await this.notificationRepository.findAndCount({
      relations: ['post', 'fromUser', 'comment', 'comment.post'],
      select: {
        fromUser: {id: true, surname: true, name: true, nickname: true, avatar: true},
        comment: {
          id: true,
          createDate: true,
          text: true,
          post: {
            id: true, 
            createDate: true
          }
        }
      },
      where: {user: {id}},
      order: {createDate: 'DESC'},
      take: count,
      skip: page * count - count
    })
    setTimeout(async () => {
      notificationsAndCount[0].forEach(n => {
        n.status = NotificationStatus.READ
      })
      await this.notificationRepository.save(notificationsAndCount[0])
      await this.sendCount(id)
    }, 0)
    return notificationsAndCount
  }

  async readIncomingRequest(id: number) { 
    const notifications = await this.notificationRepository.find({
      where: {user: {id}, type: NotificationType.FRIEND_REQUEST}
    })
    notifications.forEach(notification => notification.status = NotificationStatus.READ )
    await this.notificationRepository.save(notifications)
  }
}
