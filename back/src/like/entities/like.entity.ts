import { CommentEntity } from "src/comment/entities/comment.entity";
import { PostEntity } from "src/post/entities/post.entity";
import { UserEntity } from "src/user/entities/user.entity";
import { BaseEntity } from "src/utils/base.entity";
import { Entity, ManyToOne } from "typeorm";

@Entity()
export class LikeEntity extends BaseEntity {
    @ManyToOne(() => UserEntity, user => user.likes)
    user: UserEntity

    @ManyToOne(() => PostEntity, post => post.likes)
    post: PostEntity

    @ManyToOne(() => CommentEntity, comment => comment.likes)
    comment: CommentEntity
}
