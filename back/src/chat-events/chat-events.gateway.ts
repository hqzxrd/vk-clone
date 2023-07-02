import { WebSocketGateway, SubscribeMessage, MessageBody, ConnectedSocket } from '@nestjs/websockets';
import { ChatEventsService } from './service/chat-events.service';
import { PRIVATE_CHAT_EVENT } from './chat-events.constants';
import { Server, Socket } from 'socket.io'
import { UseGuards } from '@nestjs/common';
import { WsAccessJwtGuard } from './guards/access-jwt-ws.guard';
import { SocketUser } from 'src/adapter/auth.adapter';

@WebSocketGateway({
  cors: {
    origin: '*'
  }
})
export class ChatEventsGateway {
  constructor(private readonly chatEventsService: ChatEventsService) {}

  
  handleConnection(client: SocketUser) {
    console.log(client.user)
    this.chatEventsService.handleConnection(client)
  }

  handleDisconnect(client: SocketUser) {
    this.chatEventsService.handleDisconnect(client)
  }

  afterInit(server: Server) {
    this.chatEventsService.server = server
  }

  @SubscribeMessage(PRIVATE_CHAT_EVENT)
  handlePrivateChat(
    @ConnectedSocket() socket: SocketUser,
    @MessageBody() data) {
    console.log(socket.id)
  }
}
