import { Module } from '@nestjs/common';
import { AuthService } from './service/auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TokenEntity } from './entities/token.entity';
import { TokenService } from './service/token.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport'
import { AccessJwtStrategy } from './strategies/access.strategy';
import { RefreshJwtStrategy } from './strategies/refresh.strategy';
import { MailModule } from 'src/mail/mail.module';
import { ConfirmationEntity } from './entities/confirmation.entity';
import { ConfirmationService } from './service/confirmation.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService, TokenService, ConfirmationService, AccessJwtStrategy, RefreshJwtStrategy],
  imports: [
    TypeOrmModule.forFeature([TokenEntity, ConfirmationEntity]),
    JwtModule.register({}),
    UserModule,
    PassportModule,
    MailModule
  ],
  exports: [TokenService]
})
export class AuthModule {}
