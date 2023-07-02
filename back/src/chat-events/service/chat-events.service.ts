import { Injectable } from '@nestjs/common';
import {Server, Socket} from 'socket.io'

@Injectable()
export class ChatEventsService {
   server: Server


   handleConnection(client: Socket) {

   }

   handleDisconnect(client: Socket) {
     
   }
}
