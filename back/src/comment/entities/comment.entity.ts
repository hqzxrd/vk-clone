import { PostEntity } from "src/post/entities/post.entity";
import { UserEntity } from "src/user/entities/user.entity";
import { BaseEntity } from "src/utils/base.entity";
import { Column, Entity, ManyToOne } from "typeorm";

@Entity('comment')
export class CommentEntity extends BaseEntity{
    @Column()
    text: string

    @ManyToOne(() => PostEntity, post => post.comments)
    post: PostEntity

    @ManyToOne(() => UserEntity, author => author.comments)
    author: UserEntity
}
