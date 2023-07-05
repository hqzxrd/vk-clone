import { MessageEntity } from "src/message/entities/message.entity";
import { UserEntity } from "src/user/entities/user.entity";
import { AbstractEntity } from "src/utils/base.entity";
import { Column, Entity, ManyToOne, OneToMany } from "typeorm";

@Entity('room')
export class RoomEntity extends AbstractEntity {
    @Column()
    name: string

    @ManyToOne(() => UserEntity, owner => owner.ownerRooms) 
    owner: UserEntity

    @OneToMany(() => MessageEntity, message => message.room) 
    messages: MessageEntity[]
}
