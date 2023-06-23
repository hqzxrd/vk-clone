import { NotificationType } from "../enums/notification.type.enum"

type column_type = 'comment' | 'post'

export class CreateNotificationDto {
    type: NotificationType
    userId: number
    fromUserId: number
    column_type?: column_type
    column_id?: number
}
