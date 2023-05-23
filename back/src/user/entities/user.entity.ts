import { TokenEntity } from "src/auth/entities/token.entity";
import { CommentEntity } from "src/comment/entities/comment.entity";
import { PostEntity } from "src/post/entities/post.entity";
import { BaseEntity } from "src/utils/base.entity";
import { Column, Entity, OneToMany } from "typeorm";

export enum Gender {
    MALE = 'male',
    FEMALE = 'female'
}

@Entity('users')
export class UserEntity extends BaseEntity {
    @Column({unique: true})
    email: string

    @Column()
    password: string

    @Column()
    name: string

    @Column()
    surname: string

    @Column({
        transformer: {
            to(value: Date | string | null): string {
              return value instanceof Date ? value.toISOString() : value;
            },
            from(value: string | null): Date {
              return value ? new Date(`${value}Z`) : null;
            },
        }
    })
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

    @OneToMany(() => CommentEntity, comment => comment.author)
    comments: CommentEntity[]

    @OneToMany(() => PostEntity, post => post.author)
    posts: PostEntity

    @OneToMany(() => TokenEntity, (token) => token.user, {cascade: true})
    tokens: TokenEntity[]
}
