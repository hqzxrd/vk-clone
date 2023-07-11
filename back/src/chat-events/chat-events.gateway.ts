import { WebSocketGateway, SubscribeMessage, MessageBody, ConnectedSocket,  } from '@nestjs/websockets';
import { ChatEventsService } from './service/chat-events.service';
import { DELETE_MESSAGE_EVENT, GET_MESSAGES_CHAT_EVENT, PRIVATE_CHAT_EVENT, UPDATE_MESSAGE_EVENT, FIND_CHAT_BY_USER_ID_EVENT, GET_ALL_CHAT_EVENT } from './chat-events.constants';
import { Server } from 'socket.io'
import { UseFilters, UsePipes, ValidationPipe } from '@nestjs/common';
import { SocketUser } from 'src/adapter/auth.adapter';
import { WsExceptionFilter } from './filters/ws-exception.filter';
import { SendPrivateChatDto } from './dto/send-private-message.dto';
import { SendUpdateMessageDto } from './dto/send-update-message.dto';
import { GetMessagesDto } from './dto/get-messages.dto';
import { PaginationQueryDto } from 'src/utils/pagination.query.dto';

@UsePipes(new ValidationPipe({whitelist: true}))
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
    @MessageBody() dto: SendPrivateChatDto
  ) {
    return this.chatEventsService.handlePrivateChat(socket, dto)
  }

  // * message method
  @SubscribeMessage(UPDATE_MESSAGE_EVENT)
  handleUpdateMessage(
    @ConnectedSocket() socket: SocketUser,
    @MessageBody() dto: SendUpdateMessageDto
  ) {
    return this.chatEventsService.handleUpdateMessage(socket, dto)
  }

  @SubscribeMessage(DELETE_MESSAGE_EVENT)
  handleDeleteMessage(
    @ConnectedSocket() socket: SocketUser,
    @MessageBody('id') messageId: number
  ) {
    return this.chatEventsService.handleDeleteMessage(socket, messageId)
  }

  // * get messages by chat id
  @SubscribeMessage(GET_MESSAGES_CHAT_EVENT)
  handleGetMessageByChatId(
    @ConnectedSocket() socket: SocketUser,
    @MessageBody() dto: GetMessagesDto
  ) {
    return this.chatEventsService.handleGetMessages(socket.user.id, dto)
  }

  @SubscribeMessage(FIND_CHAT_BY_USER_ID_EVENT)
  handleFindChatByUserId(
    @ConnectedSocket() socket: SocketUser,
    @MessageBody('userId') userId: number
  ) {
    return this.chatEventsService.handleFindChatByUserId(socket.user.id, userId) 
  }

  @SubscribeMessage(GET_ALL_CHAT_EVENT)
  handleGetAllChat(
    @ConnectedSocket() socket: SocketUser,
    @MessageBody() {page, count}: PaginationQueryDto
  ) {
    return this.chatEventsService.handleGetAllChat(socket.user.id, page, count)
  }
}



