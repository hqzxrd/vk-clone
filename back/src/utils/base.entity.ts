import {CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn} from 'typeorm'

export abstract class AbstractEntity {
    @PrimaryGeneratedColumn()
    id: number

    @CreateDateColumn()
    createDate: Date

    @UpdateDateColumn()
    updateDate: Date
}