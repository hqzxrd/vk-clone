import { Module } from '@nestjs/common';
import { ChatService } from './service/chat.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatEntity } from './entities/chat.entity';
import { MessageModule } from 'src/message/message.module';


@Module({
  imports: [
    TypeOrmModule.forFeature([ChatEntity]),
    MessageModule
  ],
  providers: [ChatService],
  exports: [ChatService]
})
export class ChatModule {}
