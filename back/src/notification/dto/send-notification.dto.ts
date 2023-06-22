import { PickType } from "@nestjs/mapped-types"
import { CreateCommentDto } from "src/comment/dto/create-comment.dto"
import { NotificationType } from "src/notification/enums/notification.type.enum"
import { CreateNotificationDto } from "./create-notification.dto"

export class SendNotificationDto extends PickType(CreateNotificationDto, ['fromUserId', 'type', 'userId']){}