import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from '../dto/create-message.dto';
import { UpdateMessageDto } from '../dto/update-message.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { MessageEntity } from '../entities/message.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MessageService {

  constructor(
    @InjectRepository(MessageEntity) private readonly messageRepository: Repository<MessageEntity>
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

  findAll() {
    return `This action returns all message`;
  }

  findOne(id: number) {
    return `This action returns a #${id} message`;
  }

  update(id: number, updateMessageDto: UpdateMessageDto) {
    return `This action updates a #${id} message`;
  }

  remove(id: number) {
    return `This action removes a #${id} message`;
  }
}
