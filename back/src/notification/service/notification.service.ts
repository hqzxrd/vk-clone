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
  private notificationEvents: Record<string, Subject<any>> = {}

  constructor(
    @InjectRepository(NotificationEntity) private readonly notificationRepository: Repository<NotificationEntity>
  ) {}

  handleConnection(id: number) {
    if(!this.notificationEvents[id]) {
      this.notificationEvents[id] = new Subject()
    }
    return this.notificationEvents[id].asObservable();
  }

 async send(dto: CreateNotificationDto) {
    if(!this.notificationEvents[dto.userId]) return
    if(dto.userId === dto.fromUserId) return
    const notification = await this.create(dto)
    this.notificationEvents[dto.userId].next({ data: { ...notification } });
 }

  private async create(createDto: CreateNotificationDto) {
    const dto: DeepPartial<NotificationEntity>= {
      user: {id: createDto.userId}, 
      fromUser: {id: createDto.fromUserId},
      type: createDto.type
    }
    if(createDto.type === NotificationType.MESSAGE) return dto
    const notification = this.notificationRepository.create({...dto,  [createDto.column_type]: {id: createDto.column_id}})
    return await this.notificationRepository.save(notification)
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
      relations: {
        comment: true,
        fromUser: true,
        post: true,
      },
      where: {user: {id}},
      order: {createDate: 'DESC'},
      take: count,
      skip: page * count - count
    })

    notificationsAndCount[0].forEach(n => {
      n.status = NotificationStatus.READ
    })

    setTimeout(async () => await this.notificationRepository.save(notificationsAndCount[0]), 0)

    return notificationsAndCount
  }
}
