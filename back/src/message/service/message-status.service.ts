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
        return await this.messageStatusRepository.save({...status, isRead: true})
    }
    
    async setRedAllOld(userId: number, chatId: number) {
        await this.messageStatusRepository.update(
            { 
                author: {id: userId}, 
                message: {chat: {id: chatId}}, 
                isRead: false
            }, 
            {isRead: true}
        )
       
    }
}