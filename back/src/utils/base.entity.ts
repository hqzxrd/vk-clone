import {CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn} from 'typeorm'
import { transformer } from './transformer.date'

export abstract class AbstractEntity {
    @PrimaryGeneratedColumn()
    id: number

    @CreateDateColumn({ transformer })
    createDate: Date

    @UpdateDateColumn({ transformer })
    updateDate: Date
}