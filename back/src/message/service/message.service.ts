import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateMessageDto } from '../dto/create-message.dto';
import { UpdateMessageDto } from '../dto/update-message.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { MessageEntity } from '../entities/message.entity';
import { Repository } from 'typeorm';
import { UserService } from 'src/user/service/user.service';

@Injectable()
export class MessageService {

  constructor(
    @InjectRepository(MessageEntity) private readonly messageRepository: Repository<MessageEntity>,
    private readonly userService: UserService
  ){}

  
  async create({columnId, text, type, userId}: CreateMessageDto) {
    // ! types
    const dto = {
      text,
      type,
      [type]: {id: columnId},
      author: {id: userId}
    }
    const message = this.messageRepository.create(dto)
    return await this.messageRepository.save(message)
  }

  async getMessagesByChatId(chatId: number, page: number, count: number) {
    const messages = await this.messageRepository.findAndCount({
      where: {
        chat: {id: chatId}
      },
      relations: ['chat', 'chat.userA', 'chat.userB', 'author'],
      select: {
        author: {
          id: true,
          name: true,
          surname: true,
          nickname: true,
          avatar: true
        },
        chat: {
          id: true,
          userA: {id: true},
          userB: {id: true}
        }
      },
      take: count,
      skip: page * count - count,
      order: {createDate: 'DESC'}
    })
    return messages
  }

  async findOne(id: number) {
    const message = await this.messageRepository.findOne({
      where: {id},
      relations: ['chat', 'chat.userA', 'chat.userB', 'author'],
      select: {
        id: true,
        author: this.userService.returnBaseKeyUser,
        chat: {
          id: true,
          userA: {id: true},
          userB: {id: true}
        }
      }
    }) 
    return message
  }

  async update(id: number, text: string, userId: number) {
    const message = await this.findOne(id)
    if(!message) throw new NotFoundException()
    if(message.author.id !== userId) throw new ForbiddenException()
    
    return await this.messageRepository.save({...message, text})
  }

  async delete(id: number, userId: number) {
    const message = await this.findOne(id)

    if(!message) throw new NotFoundException()
    if(message.author.id !== userId) throw new ForbiddenException()
    await this.messageRepository.remove(message)
    message.id = id
    return message
  }

  async getLastMessageByChatId(chatId: number) {
    const message = await this.messageRepository.findOne({
      where: {chat: {id: chatId}},
      order: {
        createDate: 'DESC'
      },
      relations: {author: true},
      select: {
        author: {
          id: true,
          name: true,
          surname: true,
          avatar: true
        }
      }
    })
    return message
  }
}
