import { Controller, Get, Ip, Param, ParseIntPipe, Query, Req, Res, Sse } from '@nestjs/common';
import { NotificationService } from './service/notification.service';
import { AccessJwtGuard } from 'src/auth/decorators/access-jwt.decorator';
import { User } from 'src/user/decorators/user.decorator';
import { FastifyReply } from 'fastify';

@Controller('notification')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  // @AccessJwtGuard()
  @Sse('sse')
  handleConnection(
    @Query('id') id: string
  ){
    const userId = +id
    return this.notificationService.handleConnection(userId)
  }

  // @Get(':id')
  // get(
  //   @Param('id', ParseIntPipe) id: number 
  // ) {
  //   // return this.notificationService.send(id, {message: 'ПОшел нахуй'})
  // } 

  // @AccessJwtGuard()
  
  // @Get()
  // getNotification(
  //   @User('id') userId: number
  // ) {
  //   return this.notificationService.getNotification(userId)
  // }
}
