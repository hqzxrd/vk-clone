import { Module } from '@nestjs/common';
import { MessageService } from './service/message.service';
import { MessageController } from './message.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessageEntity } from './entities/message.entity';
import { MessageStatusEntity } from './entities/message-status.entity';
import { UserModule } from 'src/user/user.module';
import { MessageStatusService } from './service/message-status.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([MessageEntity, MessageStatusEntity]),
    UserModule
  ],
  controllers: [MessageController],
  providers: [MessageService, MessageStatusService],
  exports: [MessageService, MessageStatusService]
})
export class MessageModule {}
