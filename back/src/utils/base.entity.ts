import {CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn} from 'typeorm'

export abstract class BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @CreateDateColumn()
    createDate: Date

    @UpdateDateColumn()
    updateDate: Date
}