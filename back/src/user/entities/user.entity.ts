import { TokenEntity } from "src/auth/entities/token.entity";
import { CommentEntity } from "src/comment/entities/comment.entity";
import { FriendRequestEntity } from "src/friend/entities/friend-request.entity";
import { LikeEntity } from "src/like/entities/like.entity";
import { NotificationEntity } from "src/notification/entities/notification.entity";
import { PostEntity } from "src/post/entities/post.entity";
import { AbstractEntity } from "src/utils/base.entity";
import { transformer } from "src/utils/transformer.date";
import { Column, Entity, JoinTable, ManyToMany, OneToMany } from "typeorm";

export enum Gender {
    MALE = 'male',
    FEMALE = 'female'
}

@Entity('users')
export class UserEntity extends AbstractEntity {
    @Column({unique: true})
    email: string

    @Column()
    password: string

    @Column()
    name: string

    @Column()
    surname: string

    @Column({ transformer })
    birthday: Date

    @Column({type: 'enum', enum: Gender})
    gender: Gender

    @Column({nullable: true})
    city: string

    @Column({nullable: true})
    status: string

    @Column({nullable: true})
    nickname: string

    @Column({nullable: true, unique: true})
    code: number

    @Column({nullable: true})
    avatar: string

    @ManyToMany(() => UserEntity)
    @JoinTable({name: 'friend'})
    friends: UserEntity[]

    // * Входящие заявки
    @OneToMany(() => FriendRequestEntity, friendRequest => friendRequest.toUser)
    incomingRequests: FriendRequestEntity[]

    // * Исходящие заявки
    @OneToMany(() => FriendRequestEntity, friendSubscription => friendSubscription.fromUser)
    outgoingRequests: FriendRequestEntity[]

    @OneToMany(() => CommentEntity, comment => comment.author)
    comments: CommentEntity[]

    @OneToMany(() => LikeEntity, like => like.user) 
    likes: LikeEntity[]

    @OneToMany(() => PostEntity, post => post.author)
    posts: PostEntity

    @OneToMany(() => TokenEntity, (token) => token.user, {cascade: true})
    tokens: TokenEntity[]

    @OneToMany(() => NotificationEntity, notification => notification.user) 
    notifications: NotificationEntity[]

    @OneToMany(() => NotificationEntity, notification => notification.fromUser, {cascade: true})
    _fromNotification: NotificationEntity[]
}
