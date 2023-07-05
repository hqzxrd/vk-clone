import { Module } from '@nestjs/common';
import { ChatService } from './service/chat.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatEntity } from './entities/chat.entity';


@Module({
  imports: [
    TypeOrmModule.forFeature([ChatEntity])
  ],
  providers: [ChatService],
  exports: [ChatService]
})
export class ChatModule {}
