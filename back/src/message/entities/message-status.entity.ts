import { UserEntity } from "src/user/entities/user.entity";
import { AbstractEntity } from "src/utils/base.entity";
import { Column, Entity, ManyToOne } from "typeorm";
import { MessageEntity } from "./message.entity";

@Entity('message_status')
export class MessageStatusEntity extends AbstractEntity {
    @ManyToOne(() => UserEntity, author => author._messageStatus)
    author: UserEntity

    @ManyToOne(() => MessageEntity, message => message.statuses, {onDelete: 'CASCADE'})
    message: MessageEntity

    @Column({default: false})
    isRead: boolean
}