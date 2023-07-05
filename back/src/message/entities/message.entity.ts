import { AbstractEntity } from "src/utils/base.entity";
import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { MessageStatusEntity } from "./message-status.entity";
import { UserEntity } from "src/user/entities/user.entity";
import { RoomEntity } from "src/room/entities/room.entity";
import { ChatEntity } from "src/chat/entities/chat.entity";
import { MessageType } from "../message.type.enum";



@Entity('messages')
export class MessageEntity extends AbstractEntity {
    
    @ManyToOne(() => UserEntity, author => author.messages)
    author: UserEntity

    @OneToMany(() => MessageStatusEntity, messageStatus => messageStatus.message)
    statuses: MessageStatusEntity[]

    @Column()
    text: string

    @Column({
        enum: MessageType,
        type: 'enum'
    })
    type: MessageType

    @ManyToOne(() => RoomEntity, room => room.messages)
    room: RoomEntity

    @ManyToOne(() => ChatEntity, chat => chat.messages)
    chat: ChatEntity
}
