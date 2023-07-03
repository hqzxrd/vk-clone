import { Logger, Module } from '@nestjs/common';
import { ChatEventsService } from './service/chat-events.service';
import { ChatEventsGateway } from './chat-events.gateway';
import { AuthModule } from 'src/auth/auth.module';
import { WsAccessJwtGuard } from './guards/access-jwt-ws.guard';
import { UserModule } from 'src/user/user.module';
import { ChatModule } from 'src/chat/chat.module';
import { MessageModule } from 'src/message/message.module';

@Module({
  imports: [
    AuthModule, 
    UserModule, 
    ChatModule,
    MessageModule
  ],
  providers: [ChatEventsGateway, ChatEventsService, WsAccessJwtGuard, Logger]
})
export class ChatEventsModule {}
