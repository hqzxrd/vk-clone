import { BadRequestException, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { RegistrationDto } from '../dto/registration.dto';
import { LoginDto } from '../dto/login.dto';
import { UserService } from 'src/user/service/user.service';
import { EMAIL_NOT_CONFIRMED, INCORRECT_PASSWORD, USER_ALREADY_EXISTS, USER_NOT_FOUND } from '../constants/auth.error.constants';
import {hash, compare, genSalt} from 'bcrypt'
import { TokenService } from './token.service';
import { UserEntity } from 'src/user/entities/user.entity';
import { MailService } from 'src/mail/mail.service';
import { generateCode } from 'src/utils/gencode';
import { ConfirmationService } from './confirmation.service';
import { ChangePasswordDto } from '../dto/change-password.dto';
import { CodeVerifPasswordDto } from '../dto/code-verif-password.dto';
import { INCORRECT_CODE } from 'src/user/constants/user.error.constants';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly tokenService: TokenService,
    private readonly mailService: MailService,
    private readonly confirmationService: ConfirmationService
  ){}

  async registration(dto: RegistrationDto) {
    const oldUser = await this.userService.byEmail(dto.email)

    if(oldUser) throw new BadRequestException(USER_ALREADY_EXISTS)

    const isConfirmation = await this.confirmationService.checkIsAuth(dto.email)
    if(!isConfirmation) throw new ForbiddenException(EMAIL_NOT_CONFIRMED)

    const salt = await genSalt(8)
    const hashPassword = await hash(dto.password, salt)
    const user = await this.userService.create({...dto, password: hashPassword})
    await this.confirmationService.delete(dto.email)
    const userData = await this.generateAndSaveToken(user)
    return userData
  }

  async login({email, password}: LoginDto) {
    const user = await this.userService.byEmail(email)
    if(!user) throw new BadRequestException(USER_NOT_FOUND)
    
    const isMatch = await compare(password, user.password)
    if(!isMatch) throw new BadRequestException(INCORRECT_PASSWORD)

    const userData = await this.generateAndSaveToken(user)
    return userData
  }

  async refresh(refreshToken: string, userId: number) {
    const token = await this.tokenService.byToken(refreshToken)
    const user = await this.userService.byId(userId)
    if(!token || !user) throw new UnauthorizedException()
    await this.tokenService.delete(token.id)
    const tokens = this.tokenService.generateTokens(user)
    await this.tokenService.saveToken(tokens.refreshToken, user.id)
    return tokens
  }

  async logout(refreshToken: string) {
    if(!refreshToken) return
    const token = await this.tokenService.byToken(refreshToken)
    if(!token) return
    await this.tokenService.delete(token.id)
  }


  async codeVerification(code: number, email: string) {
    await this.confirmationService.setAuthByCode(email, code)
  }


  private async generateAndSaveToken(user: UserEntity) {
    const tokens = this.tokenService.generateTokens(user)
    await this.tokenService.saveToken(tokens.refreshToken, user.id)

    return {
      ...tokens, 
      user: {
        email: user.email,
        name: user.name,
        surname: user.surname,
        nickname: user.nickname,
        id: user.id,
        avatar: user.avatar
      }
    }
  }

  async confirmationEmail(email: string) {
    const user = await this.userService.byEmail(email)
    if(user) throw new BadRequestException(USER_ALREADY_EXISTS)
    const code = generateCode()
    await this.confirmationService.setCodeOrCreate(email, code)
    await this.mailService.sendCode(email, code)
  }

  async changePassword(userId: number, {password, newPassword}: ChangePasswordDto) {
    const user = await this.userService.byId(userId)
    if(!user) throw new UnauthorizedException()

    const isMatch = await compare(password, user.password)
    if(!isMatch) throw new BadRequestException(INCORRECT_PASSWORD)
    const salt = await genSalt(8)
    const hashPassword = await hash(newPassword, salt)
    await this.userService.setPassword(userId, hashPassword)
  }

  async codeVerificationForResetPassword({email, code, password}: CodeVerifPasswordDto) {
    const user = await this.userService.byEmail(email)
    if(!user) throw new BadRequestException(USER_NOT_FOUND)
    if(code !== user.code) throw new BadRequestException(INCORRECT_CODE)
    await this.userService.setCode(user.id, null)
    const salt = await genSalt(8)
    const hashPassword = await hash(password, salt)
    await this.userService.setPassword(user.id, hashPassword)
  }

  async resetPassword(email: string) {
    const user = await this.userService.byEmail(email)
    if(!user) throw new BadRequestException(USER_NOT_FOUND)
    const code = generateCode()
    await this.userService.setCode(user.id, code)
    await this.mailService.sendCode(email, code)
  }
}
