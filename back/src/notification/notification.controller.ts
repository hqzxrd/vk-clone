import { Controller, Get, Ip, Param, ParseIntPipe, Query, Req, Res, Sse, UsePipes, ValidationPipe } from '@nestjs/common';
import { NotificationService } from './service/notification.service';
import { AccessJwtGuard } from 'src/auth/decorators/access-jwt.decorator';
import { User } from 'src/user/decorators/user.decorator';
import { PaginationQueryDto } from 'src/utils/pagination.query.dto';

@Controller('notification')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @AccessJwtGuard()
  @Sse('sse')
  handleConnection(
    @User('id') userId: number
  ){
    return this.notificationService.handleConnection(userId)
  }

  @AccessJwtGuard()
  @UsePipes(new ValidationPipe({transform: true}))
  @Get()
  getNotification( 
    @Query() {count, page}: PaginationQueryDto,
    @User('id') userId: number

  ) {
    return this.notificationService.getAll(userId, page, count)
  }
}
