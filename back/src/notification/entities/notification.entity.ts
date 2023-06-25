import { AbstractEntity } from "src/utils/base.entity";
import { NotificationType } from "../enums/notification.type.enum";
import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { UserEntity } from "src/user/entities/user.entity";
import { NotificationStatus } from "../enums/notification.status.enum";
import { CommentEntity } from "src/comment/entities/comment.entity";
import { PostEntity } from "src/post/entities/post.entity";

@Entity('notification')
export class NotificationEntity extends AbstractEntity {
    @Column({
        type: 'enum',
        enum: NotificationType
    })
    type: NotificationType

    @Column({
        type: 'enum',
        enum: NotificationStatus,
        default: NotificationStatus.NOT_READ
    })
    status: NotificationStatus


    @ManyToOne(() => UserEntity, user => user._fromNotification, {onDelete: 'CASCADE'})
    fromUser: UserEntity

    @ManyToOne(() => UserEntity, user => user.notifications)
    user: UserEntity

    @ManyToOne(() => CommentEntity, comment => comment._notifications, {onDelete: 'CASCADE'})
    comment: CommentEntity

    @ManyToOne(() => PostEntity, post => post._notifications, {onDelete: 'CASCADE'})
    post: PostEntity
}
