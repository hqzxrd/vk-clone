import { UserEntity } from "src/user/entities/user.entity";
import { AbstractEntity } from "src/utils/base.entity";
import { Column, Entity, ManyToOne } from "typeorm";

@Entity('token')
export class TokenEntity extends AbstractEntity {
    @Column({unique: true})
    refreshToken: string

    @ManyToOne(() => UserEntity, user => user.tokens, {onDelete: 'CASCADE'})
    user: UserEntity
}