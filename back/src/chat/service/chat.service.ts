import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ChatEntity } from '../entities/chat.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(ChatEntity) private readonly chatRepository: Repository<ChatEntity>
  ) {}

  async createOrFind(ids: number[]) {
    const oldChat = await this.chatRepository.findOne({
      where: [
        {users: [{id: ids[0]}, {id: ids[1]}]},
        {users: [{id: ids[1]}, {id: ids[0]}]}
      ],
      relations: {users: true}
    })
    if(oldChat) return oldChat

    const newChat = this.chatRepository.create({users: [{id: ids[0]}, {id: ids[1]}]})
    return await this.chatRepository.save(newChat)
  }

  async checkUser(chatId: number, userId: number) {
    const chat = await this.chatRepository.findOne({
      where: {id: chatId},
      relations: {users: true},
      select: {users: {id: true}}
    })
    if(!chat) throw new NotFoundException()

    if(chat.users.some(user => user.id === userId)) return true
    return false
  }
}
