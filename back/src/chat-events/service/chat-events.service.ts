import { ForbiddenException, Injectable, Logger } from '@nestjs/common';
import {Server, Socket} from 'socket.io'
import { SocketUser } from 'src/adapter/auth.adapter';
import { ChatService } from 'src/chat/service/chat.service';
import { UserService } from 'src/user/service/user.service';
import { SendPrivateChatDto } from '../dto/send-private-message.dto';
import { MessageService } from 'src/message/service/message.service';
import { MessageType } from 'src/message/message.type.enum';
import { MessageEntity } from 'src/message/entities/message.entity';
import { RECEIVE_DELETE_MESSAGE_EVENT, RECEIVE_MESSAGE_EVENT, RECEIVE_UPDATE_MESSAGE_EVENT } from '../chat-events.constants';
import { SendUpdateMessageDto } from '../dto/send-update-message.dto';
import { GetMessagesDto } from '../dto/get-messages.dto';

@Injectable()
export class ChatEventsService {
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
      await this.sendPrivateMessage(RECEIVE_MESSAGE_EVENT, dto.toUserId, message)
      return message
   }

   async handleUpdateMessage(client: SocketUser, {id, text}: SendUpdateMessageDto) {
      const userId = client.user.id
      const message = await this.messageService.update(id, text, userId)
      const users = [message.chat.userA, message.chat.userB]
      const [toUser] = users.filter(user => user.id !== userId)
      await this.sendPrivateMessage(RECEIVE_UPDATE_MESSAGE_EVENT, toUser.id, message)
      return message
   }

   async handleDeleteMessage(client: SocketUser, messageId: number) {
      const userId = client.user.id
      const message = await this.messageService.delete(messageId, userId)
      const users = [message.chat.userA, message.chat.userB]
      const [toUser] = users.filter(user => user.id !== userId)
      await this.sendPrivateMessage(RECEIVE_DELETE_MESSAGE_EVENT, toUser.id, message)
   }

   async handleGetMessages(userId: number, { chatId, page, count }: GetMessagesDto) {
      const isCheckUser = await this.chatService.checkUser(chatId, userId)
      if(!isCheckUser) throw new ForbiddenException()
      const messages = await this.messageService.getMessagesByChatId(chatId, page, count)
      return messages
   }

   async handleFindChatByUserId(userId: number, toUserId: number) {
      const chat = await this.chatService.createOrFind([userId, toUserId])
      return chat
   }

   async handleGetAllChat(userId: number, page: number, count: number) {
      return await this.chatService.getChats(userId, page, count)
   }

   private async sendPrivateMessage(event: string, toUserId: number, message: MessageEntity) {
      const socketIds = await this.userService.getSocketIds(toUserId)
      socketIds.forEach(socketId => {
         this.server.to(socketId).emit(event, message) 
      })
   }
}
