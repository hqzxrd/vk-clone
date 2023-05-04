import { UserEntity } from "src/user/entities/user.entity";
import { BaseEntity } from "src/utils/base.entity";
import { Column, Entity, ManyToOne } from "typeorm";

@Entity('token')
export class TokenEntity extends BaseEntity {
    @Column({unique: true})
    refreshToken: string

    @ManyToOne(() => UserEntity, user => user.tokens, {onDelete: 'CASCADE'})
    user: UserEntity
}