import { FileModule } from './file/file.module';
import { Logger, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EnvConfigOptions } from './configs/env.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getTypeormOptions } from './configs/typeorm.options';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { getMailerConfig } from './configs/mailer.config';
import { MailModule } from './mail/mail.module';
import { DropboxModule } from './dropbox/dropbox.module';
import { PostModule } from './post/post.module';
import { CommentModule } from './comment/comment.module';
import { LikeModule } from './like/like.module';
import { FriendModule } from './friend/friend.module';
import { NotificationModule } from './notification/notification.module';
import { ChatModule } from './chat/chat.module';
import { ChatEventsModule } from './chat-events/chat-events.module';
import { RoomModule } from './room/room.module';
import { MessageModule } from './message/message.module';

import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
import { RolesModule } from './roles/roles.module';

@Module({
  imports: [
    FileModule,
    ConfigModule.forRoot(EnvConfigOptions),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getTypeormOptions,
    }),
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getMailerConfig,
    }),
    AuthModule,
    UserModule,
    MailModule,
    DropboxModule,
    PostModule,
    CommentModule,
    LikeModule,
    FriendModule,
    NotificationModule,
    ChatModule,
    ChatEventsModule,
    RoomModule,
    MessageModule,
    RolesModule,
  ],
})
export class AppModule {}
