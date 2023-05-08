import { BaseEntity } from "src/utils/base.entity";
import { Column, Entity } from "typeorm";

@Entity('confirmation')
export class ConfirmationEntity extends BaseEntity {
    @Column({unique: true})
    email: string

    @Column({nullable: true})
    code: number

    @Column({default: false})
    isAuth: boolean
}