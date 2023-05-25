import { LikeEntity } from "src/like/entities/like.entity";
import { PostEntity } from "src/post/entities/post.entity";
import { UserEntity } from "src/user/entities/user.entity";
import { AbstractEntity } from "src/utils/base.entity";
import { Column, Entity, ManyToOne, OneToMany } from "typeorm";

@Entity('comment')
export class CommentEntity extends AbstractEntity{
    @Column()
    text: string

    @ManyToOne(() => PostEntity, post => post.comments)
    post: PostEntity

    @ManyToOne(() => UserEntity, author => author.comments)
    author: UserEntity

    @OneToMany(() => LikeEntity, like => like.comment)
    likes: LikeEntity[]
}
