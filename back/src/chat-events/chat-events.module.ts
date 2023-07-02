import { Module } from '@nestjs/common';
import { ChatEventsService } from './service/chat-events.service';
import { ChatEventsGateway } from './chat-events.gateway';
import { AuthModule } from 'src/auth/auth.module';
import { WsAccessJwtGuard } from './guards/access-jwt-ws.guard';

@Module({
  imports: [AuthModule],
  providers: [ChatEventsGateway, ChatEventsService, WsAccessJwtGuard]
})
export class ChatEventsModule {}
