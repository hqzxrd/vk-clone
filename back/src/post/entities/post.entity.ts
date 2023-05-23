import { CommentEntity } from "src/comment/entities/comment.entity";
import { UserEntity } from "src/user/entities/user.entity";
import { BaseEntity } from "src/utils/base.entity";
import { Column, Entity, ManyToOne } from "typeorm";

@Entity('post')
export class PostEntity extends BaseEntity {
    
    @Column({type: 'text', nullable: true})
    text: string

    @Column({type: 'simple-array', nullable: true})
    photos: string[]

    @ManyToOne(() => UserEntity, user => user.posts, {onDelete: 'CASCADE'})
    author: UserEntity

    @ManyToOne(() => CommentEntity, comment => comment.post)
    comments: CommentEntity[]
}
