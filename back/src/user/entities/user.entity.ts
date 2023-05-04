import { TokenEntity } from "src/auth/entities/token.entity";
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

    @Column({default: false})
    isAuth: boolean

    @Column()
    name: string

    @Column()
    surname: string

    @Column()
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

    @OneToMany(() => TokenEntity, (token) => token.user, {cascade: true})
    tokens: TokenEntity[]
}
