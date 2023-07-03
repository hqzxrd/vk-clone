import { Injectable, Logger } from '@nestjs/common';
import {Server, Socket} from 'socket.io'
import { SocketUser } from 'src/adapter/auth.adapter';
import { ChatService } from 'src/chat/service/chat.service';
import { UserService } from 'src/user/service/user.service';
import { SendPrivateChatDto } from '../dto/create-chat-event.dto';
import { MessageService } from 'src/message/service/message.service';
import { MessageType } from 'src/message/message.type.enum';
import { MessageEntity } from 'src/message/entities/message.entity';
import { RECEIVE_MESSAGE_EVENT } from '../chat-events.constants';

@Injectable()
export class ChatEventsService {
// ! replace console to logger
   constructor(
      private readonly userService: UserService,
      private readonly chatService: ChatService,
      private readonly messageService: MessageService,
      private readonly logger: Logger,
   ) {}

   server: Server

   async handleConnection(client: SocketUser) {
      await this.userService.setSocketId(client.user.id, client.id)
      this.logger.debug(`Connected ${client.user.name} ${client.user.surname} (${client.id})`, 'New connect')
   }

   async handleDisconnect(client: SocketUser) {
      await this.userService.deleteSocketId(client.user.id, client.id)
      this.logger.debug(`Disconnect ${client.user.name} ${client.user.surname} (${client.id})`)
   }

   async handlePrivateChat(client: SocketUser, dto: SendPrivateChatDto) {
      const chat = await this.chatService.createOrFind([client.user.id, dto.toUserId])
      const message = await this.messageService.create({
         type: MessageType.CHAT, 
         columnId: chat.id, 
         text: dto.text, 
         userId: client.user.id
      }) 
      await this.sendPrivateMessage(dto.toUserId, message)
      return message
   }

   private async sendPrivateMessage(toUserId: number, message: MessageEntity) {
      const {socketIds} = await this.userService.byId(toUserId)
      socketIds.forEach(socketId => {
         this.server.to(socketId).emit(RECEIVE_MESSAGE_EVENT, message) 
      })
   }


}
