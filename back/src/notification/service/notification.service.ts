import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Subject } from 'rxjs';
import { NotificationEntity } from '../entities/notification.entity';
import { DeepPartial, Repository } from 'typeorm';
import { CreateNotificationDto } from '../dto/create-notification.dto';
import { NotificationType } from '../enums/notification.type.enum';

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
    const notification = this.notificationRepository.create({...dto,  [createDto.column_type]: {id: createDto.column_id},})
    return await this.notificationRepository.save(notification)
  }
}
