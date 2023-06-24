import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { NotificationService } from './service/notification.service';
import { NotificationController } from './notification.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotificationEntity } from './entities/notification.entity';
import { SseMiddleware } from './middlewares/sse.auth.middleware';

@Module({
  imports: [
    TypeOrmModule.forFeature([NotificationEntity])
  ],
  controllers: [NotificationController],
  providers: [NotificationService, SseMiddleware],
  exports: [NotificationService]
})
export class NotificationModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
      consumer.apply(SseMiddleware)
      .forRoutes({path: 'notification/sse', method: RequestMethod.ALL})
    }
}
