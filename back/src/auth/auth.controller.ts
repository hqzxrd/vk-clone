import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpCode, HttpStatus, UsePipes, ValidationPipe, ParseIntPipe } from '@nestjs/common';
import { AuthService } from './service/auth.service';
import { RegistrationDto } from './dto/registration.dto';
import { LoginDto } from './dto/login.dto';
import { FastifyReply } from 'fastify';
import { REFRESH_TOKEN_COOKIE } from './constants/auth.constants';
import { RefreshJwtGuard } from './decorators/refresh-jwt.decorator';
import { User } from 'src/user/decorator/user.decorator';
import { Cookie } from './decorators/cookie.decorator';
import { CookieSerializeOptions } from '@fastify/cookie';


@Controller('auth')
export class AuthController {

  private optionsCookie: CookieSerializeOptions = {httpOnly: true, maxAge: 15 * 24 * 60 * 60 * 1000, path: '/'}

  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe())
  @Post('registration')
  async registration(
    @Body() registrationDto: RegistrationDto,
    @Res({passthrough: true}) res: FastifyReply
  ) {
    const data = await this.authService.registration(registrationDto)
    res.setCookie(REFRESH_TOKEN_COOKIE, data.refreshToken, this.optionsCookie)
    return data
  }


  @HttpCode(HttpStatus.OK)
  @Post('login')
  @UsePipes(new ValidationPipe())
  async login(
    @Body() loginDto: LoginDto,
    @Res({passthrough: true}) res: FastifyReply
  ) {
    const data = await this.authService.login(loginDto)
    res.setCookie(REFRESH_TOKEN_COOKIE, data.refreshToken,  this.optionsCookie)
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
  @UsePipes(new ValidationPipe())
  codeVerification(
    @Body('code') code: number
  ) {
    return this.authService.codeVerification(code)
  }
}
