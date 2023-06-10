import { UserEntity } from "src/user/entities/user.entity";
import { AbstractEntity } from "src/utils/base.entity";
import { Entity, ManyToOne } from "typeorm";


@Entity('friend-request')
export class FriendRequestEntity extends AbstractEntity {
    // * Кому 
    @ManyToOne(() => UserEntity, user => user.incomingRequests)
    toUser: UserEntity

    // * От кого
    @ManyToOne(() => UserEntity, user => user.outgoingRequests)
    fromUser: UserEntity
}