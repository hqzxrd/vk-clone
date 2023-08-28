import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ChatEntity } from '../entities/chat.entity';
import { In, Repository } from 'typeorm';
import { MessageService } from 'src/message/service/message.service';
import { MessageStatusService } from 'src/message/service/message-status.service';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(ChatEntity)
    private readonly chatRepository: Repository<ChatEntity>,
    private readonly messageService: MessageService,
    private readonly messageStatusService: MessageStatusService
  ) {}

  async createOrFind(ids: number[]) {
    const oldChat = await this.getByUsersIds(ids);
    console.log(oldChat)
    if (oldChat) return oldChat;

    const newChat = this.chatRepository.create({
      userA: {id: ids[0]},
      userB: {id: ids[1]}
    });
    return await this.chatRepository.save(newChat);
  }

  async getByUsersIds(ids: number[]) {
    const selectUser = {
      id: true,
      nickname: true,
      name: true,
      surname: true,
      avatar: true,
    }

    const chat = await this.chatRepository.findOne({
      where: [
       {userA: {id: ids[0]}, userB: {id: ids[1]}},
       {userA: {id: ids[1]}, userB: {id: ids[0]}},
      ],  
      relations: {
        userA: true,
        userB: true
      },
      select: {
        userA: selectUser,
        userB: selectUser
      },
    });
    return chat;
  }

  async checkUser(chatId: number, userId: number) {
    const chat = await this.chatRepository.findOne({
      where: { id: chatId },
      relations: {
        userA: true,
        userB: true
      },
      select: {
        userA: {id: true},
        userB: {id: true}
      }
    });
    if (!chat) throw new NotFoundException();

    if(chat.userA.id === userId || chat.userB.id === userId) return true
    return false;
  }

  async getChats(userId: number, page: number, count: number) {
    const selectUser = {
      id: true,
      nickname: true,
      name: true,
      surname: true,
      avatar: true,
      checkMark: true
    }
    const chatsAndCount = await this.chatRepository.findAndCount({
      where: [ {userA: {id: userId}}, {userB: {id: userId}} ],
      relations: {
        userA: true,
        userB: true
      },
      select: {
        id: true,
        createDate: true,
        userA: selectUser,
        userB: selectUser,
      },
      take: count,
      skip: page * count - count
    })
    const chats = []

    for(const chat of chatsAndCount[0]) {
      const message = await this.messageService.getLastMessageByChatId(chat.id)
      const count = await this.messageStatusService.countNotRead(chat.id)
      chats.push({
        id: chat.id, 
        message,
        createDate: chat.createDate,
        users: [chat.userA, chat.userB],
        countNoRead: count
      })
    }
    const chatsSort = chats.sort((a, b) => {
      return (b.message ? b.message.createDate : b.createDate) - ( a.message ? a.message.createDate : a.createDate)
    })
    return [chatsSort, chatsAndCount[1]] 
  }
}
