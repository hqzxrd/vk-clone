import { AbstractEntity } from "src/utils/base.entity";
import { Column, Entity } from "typeorm";

@Entity('confirmation')
export class ConfirmationEntity extends AbstractEntity {
    @Column({unique: true})
    email: string

    @Column({nullable: true})
    code: number

    @Column({default: false})
    isAuth: boolean
}