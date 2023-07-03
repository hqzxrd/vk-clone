import { WebSocketGateway, SubscribeMessage, MessageBody, ConnectedSocket,  } from '@nestjs/websockets';
import { ChatEventsService } from './service/chat-events.service';
import { PRIVATE_CHAT_EVENT } from './chat-events.constants';
import { Server } from 'socket.io'
import { UseFilters, UsePipes, ValidationPipe } from '@nestjs/common';
import { SocketUser } from 'src/adapter/auth.adapter';
import { WsExceptionFilter } from './filters/ws-exception.filter';
import { SendPrivateChatDto } from './dto/create-chat-event.dto';

@UsePipes(new ValidationPipe())
@UseFilters(new WsExceptionFilter())
@WebSocketGateway({
  cors: {
    origin: '*'
  }
})
export class ChatEventsGateway {
  constructor(private readonly chatEventsService: ChatEventsService) {}

  handleConnection(client: SocketUser) {
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
    @MessageBody() data: SendPrivateChatDto
  ) {
    return this.chatEventsService.handlePrivateChat(socket, data)
  }
}



