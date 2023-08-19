import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpCode, HttpStatus, UsePipes, ValidationPipe, ParseIntPipe } from '@nestjs/common';
import { AuthService } from './service/auth.service';
import { RegistrationDto } from './dto/registration.dto';
import { LoginDto } from './dto/login.dto';
import { FastifyReply } from 'fastify';
import { REFRESH_TOKEN_COOKIE } from './constants/auth.constants';
import { RefreshJwtGuard } from './decorators/refresh-jwt.decorator';
import { User } from 'src/user/decorators/user.decorator';
import { Cookie } from './decorators/cookie.decorator';
import { CookieSerializeOptions } from '@fastify/cookie';
import { CodeVerifDto } from './dto/code-verif.dto';
import { AccessJwtGuard } from './decorators/access-jwt.decorator';
import { ChangePasswordDto } from './dto/change-password.dto';
import { EmailDto } from './dto/email.dto';
import { CodeVerifPasswordDto } from './dto/code-verif-password.dto';

@UsePipes(new ValidationPipe())
@Controller('auth')
export class AuthController {

  private optionsCookie: CookieSerializeOptions = {httpOnly: true, maxAge: 15 * 24 * 60 * 60 * 1000, path: '/'}

  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('registration')
  async registration(
    @Body() registrationDto: RegistrationDto,
    @Res({passthrough: true}) res: FastifyReply
  ) {
    const data = await this.authService.registration(registrationDto)
    res.setCookie(REFRESH_TOKEN_COOKIE, data.refreshToken, this.optionsCookie)
    delete data.refreshToken
    return data
  }


  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(
    @Body() loginDto: LoginDto,
    @Res({passthrough: true}) res: FastifyReply
  ) {
    const data = await this.authService.login(loginDto)
    res.setCookie(REFRESH_TOKEN_COOKIE, data.refreshToken,  this.optionsCookie)
    delete data.refreshToken
    return data
  }
  
  @RefreshJwtGuard()
  @Get('refresh')
  async refresh(
    @User('id') id: number,
    @Cookie(REFRESH_TOKEN_COOKIE) token: string,
    @Res({passthrough: true}) res: FastifyReply
  ) {
    const {accessToken, refreshToken} = await this.authService.refresh(token, id)
    res.setCookie(REFRESH_TOKEN_COOKIE, refreshToken, this.optionsCookie)
    return {accessToken}
  }
  
  @HttpCode(HttpStatus.NO_CONTENT)
  @Get('logout')
  async logout(
    @Cookie(REFRESH_TOKEN_COOKIE) refreshToken: string,
    @Res({passthrough: true}) res: FastifyReply
  ) {
    await this.authService.logout(refreshToken)
    res.clearCookie(REFRESH_TOKEN_COOKIE)
    return
  }


  @HttpCode(HttpStatus.NO_CONTENT)
  @Post('code')
  codeVerification(
      @Body() {code, email}: CodeVerifDto
  ) {
    return this.authService.codeVerification(code, email)
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Post('confirmation')
  confirmationEmail(
    @Body() {email} : Pick<CodeVerifDto, 'email'>
  ) {
    return this.authService.confirmationEmail(email)
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @AccessJwtGuard()
  @Post('password/change')
  changePassword(
    @User('id') userId: number,
    @Body() changePasswordDto: ChangePasswordDto
  ) {
    return this.authService.changePassword(userId, changePasswordDto)
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Post('password/reset')
  resetPassword(
    @Body() {email}: EmailDto
  ) {
    return this.authService.resetPassword(email)
  }
  @Post('code/password')
  codeVerificationForResetPassword(
    @Body() codeVerifPasswordDto: CodeVerifPasswordDto
  ) {
    return this.authService.codeVerificationForResetPassword(codeVerifPasswordDto)
  }
}
