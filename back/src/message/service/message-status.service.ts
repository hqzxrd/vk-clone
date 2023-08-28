import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { MessageStatusEntity } from "../entities/message-status.entity";
import { Repository } from "typeorm";

@Injectable()
export class MessageStatusService { 
    constructor(
        @InjectRepository(MessageStatusEntity) private readonly messageStatusRepository: Repository<MessageStatusEntity>
    ) {}

    
    async create(messageId: number, userId: number) {
        const status = this.messageStatusRepository.create({author: {id: userId}, message: {id: messageId}})
        return await this.messageStatusRepository.save(status)
    }

    async setRead(messageId: number, userId: number) {
        const status = await this.messageStatusRepository.findOne({
            where: {
                author: {id: userId}, 
                message: {id: messageId}
            }
        })
        if(status?.isRead) return 
        return await this.messageStatusRepository.save({...status, isRead: true})
    }
    
    async setRedAllOld(userId: number, chatId: number) {
        const statuses = await this.messageStatusRepository.find({
            where: { 
                author: {id: userId}, 
                message: {chat: {id: chatId}}, 
                isRead: false
            },
            relations: {
                author: true, message: true
            },
            select: {
                id: true,
                isRead: true,
                author: {
                    id: true
                },
                message: {
                    id: true
                }
            }
        })
        for(const status of statuses) {
            status.isRead = true
        }
        await this.messageStatusRepository.save(statuses)
    }

    async countNotRead(chatId: number) {
        const count = await this.messageStatusRepository.count({
            where: {
                message: {chat: {id: chatId}}, 
                isRead: false
            }
        })
        return count
    }
}