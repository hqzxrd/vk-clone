import { ForbiddenException, Injectable, Logger, BadRequestException, NotFoundException} from '@nestjs/common';
import {Server, Socket} from 'socket.io'
import { SocketUser } from 'src/adapter/auth.adapter';
import { ChatService } from 'src/chat/service/chat.service';
import { UserService } from 'src/user/service/user.service';
import { SendPrivateChatDto } from '../dto/send-private-message.dto';
import { MessageService } from 'src/message/service/message.service';
import { MessageType } from 'src/message/message.type.enum';
import { MessageEntity } from 'src/message/entities/message.entity';
import { RECEIVE_DELETE_MESSAGE_EVENT, RECEIVE_MESSAGE_EVENT, RECEIVE_READ_MESSAGE_EVENT, RECEIVE_UPDATE_MESSAGE_EVENT } from '../chat-events.constants';
import { SendUpdateMessageDto } from '../dto/send-update-message.dto';
import { GetMessagesDto } from '../dto/get-messages.dto';
import { MessageStatusService } from 'src/message/service/message-status.service';

@Injectable()
export class ChatEventsService {
   constructor(
      private readonly userService: UserService,
      private readonly chatService: ChatService,
      private readonly messageService: MessageService,
      private readonly messageStatusService: MessageStatusService,
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
      const user = await this.userService.byUserKey(dto.toUserKey)
      if(!user) throw new BadRequestException()
      const chat = await this.chatService.createOrFind([client.user.id, user.id])
      const message = await this.messageService.create({
         type: MessageType.CHAT, 
         columnId: chat.id, 
         text: dto.text, 
         userId: client.user.id
      })
      const status = await this.messageStatusService.create(message.id, user.id)

      await this.sendPrivateMessage(RECEIVE_MESSAGE_EVENT, user.id, {...message, statuses: [status]})
      return {...message, statuses: [status]}
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
      return message
   }

   async handleReadMessage(userId: number, messageId: number) {
      const message = await this.messageService.findOne(messageId)
      if(!message) throw new BadRequestException()
      const status = await this.messageStatusService.setRead(messageId, userId)
      if(!status) return
      await this.messageStatusService.setRedAllOld(userId, message.chat.id)
      const users = [message.chat.userA, message.chat.userB]
      const [toUser] = users.filter(user => user.id !== userId)
      await this.sendPrivateMessage(RECEIVE_READ_MESSAGE_EVENT, toUser.id, status)
      return status
   }

   async handleGetMessages(userOneId: number, { userKey, page, count }: GetMessagesDto) {
      const user = await this.userService.byUserKey(userKey)
      if(!user) throw new BadRequestException()
      const chat = await this.chatService.getByUsersIds([userOneId, user.id])
      if(!chat) throw new NotFoundException()
      const messages = await this.messageService.getMessagesByChatId(chat.id, page, count)
      return messages
   }

   async handleFindChatByUserKey(userId: number, toUserKey: number | string) {
      const user = await this.userService.byUserKey(toUserKey)
      if(!user) throw new BadRequestException()
      const chat = await this.chatService.getByUsersIds([userId, user.id])
      if(!chat) {
         return {
            users: [
               {
                  id: user.id,
                  nickname: user.nickname,
                  name: user.name,
                  surname: user.surname,
                  avatar: user.avatar,
                  checkMark: user.checkMark
               }
            ]
         }
      }
      return {
         id: chat.id,
         createDate: chat.createDate,
         updateDate: chat.updateDate,
         users: [chat.userA, chat.userB],
      }
   }

   async handleGetAllChat(userId: number, page: number, count: number) {
      return await this.chatService.getChatsAndLastMessage(userId, page, count)
   }

   async handleCountNoReadChats(userId: number) {
      const chats = await this.chatService.getChatsByUserIdNoRead(userId)
   }

   private async sendPrivateMessage(event: string, toUserId: number, message: MessageEntity | unknown) {
      const socketIds = await this.userService.getSocketIds(toUserId)
      socketIds.forEach(socketId => {
         this.server.to(socketId).emit(event, message) 
      })
   }
}
