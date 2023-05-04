import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EnvConfigOptions } from './configs/env.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getTypeormOptions } from './configs/typeorm.options';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { getMailerConfig } from './configs/mailer.config';
import { MailModule } from './mail/mail.module';

@Module({
  imports: [
    ConfigModule.forRoot(EnvConfigOptions),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getTypeormOptions
    }),
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getMailerConfig
    }),
    AuthModule,
    UserModule,
    MailModule
  ]
})
export class AppModule {}
