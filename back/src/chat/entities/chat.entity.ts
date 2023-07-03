import { MessageEntity } from "src/message/entities/message.entity";
import { UserEntity } from "src/user/entities/user.entity";
import { AbstractEntity } from "src/utils/base.entity";
import { Entity, JoinColumn, JoinTable, ManyToMany, OneToMany } from "typeorm";

@Entity('chat')
export class ChatEntity extends AbstractEntity {

    @ManyToMany(() => UserEntity, user => user.privateChats)
    @JoinTable({name: 'chats'})
    users: UserEntity[]

    @OneToMany(() => MessageEntity, message => message.chat) 
    messages: MessageEntity[]
}
