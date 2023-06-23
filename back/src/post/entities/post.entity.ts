import { CommentEntity } from "src/comment/entities/comment.entity";
import { LikeEntity } from "src/like/entities/like.entity";
import { NotificationEntity } from "src/notification/entities/notification.entity";
import { UserEntity } from "src/user/entities/user.entity";
import { AbstractEntity } from "src/utils/base.entity";
import { Column, Entity, ManyToOne, OneToMany } from "typeorm";

@Entity('post')
export class PostEntity extends AbstractEntity {
    
    @Column({type: 'text', nullable: true})
    text: string

    @Column({type: 'simple-array', nullable: true})
    photos: string[]

    @ManyToOne(() => UserEntity, user => user.posts, {onDelete: 'CASCADE'})
    author: UserEntity

    @OneToMany(() => CommentEntity, comment => comment.post, {cascade: true})
    comments: CommentEntity[]

    @OneToMany(() => LikeEntity, like => like.post, {cascade: true})
    likes: LikeEntity[]

    @OneToMany(() => NotificationEntity, notification => notification.post) 
    _notifications: NotificationEntity[]
}
