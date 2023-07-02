import { Module } from '@nestjs/common';
import { MessageService } from './service/message.service';
import { MessageController } from './message.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessageEntity } from './entities/message.entity';
import { MessageStatusEntity } from './entities/message-status.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([MessageEntity, MessageStatusEntity])
  ],
  controllers: [MessageController],
  providers: [MessageService]
})
export class MessageModule {}
