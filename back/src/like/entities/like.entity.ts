import { CommentEntity } from "src/comment/entities/comment.entity";
import { PostEntity } from "src/post/entities/post.entity";
import { UserEntity } from "src/user/entities/user.entity";
import { AbstractEntity } from "src/utils/base.entity";
import { Column, Entity, ManyToOne } from "typeorm";
import { LikeType } from "../like.enum";

@Entity('like')
export class LikeEntity extends AbstractEntity {
    @Column({
        type: 'enum',
        enum: LikeType
    })
    type: LikeType

    @ManyToOne(() => UserEntity, user => user.likes)
    user: UserEntity

    @ManyToOne(() => PostEntity, post => post.likes, {onDelete: 'CASCADE'})
    post: PostEntity

    @ManyToOne(() => CommentEntity, comment => comment.likes, {onDelete: 'CASCADE'})
    comment: CommentEntity
}
