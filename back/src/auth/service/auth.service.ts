import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { RegistrationDto } from '../dto/registration.dto';
import { LoginDto } from '../dto/login.dto';
import { UserService } from 'src/user/user.service';
import { INCORRECT_PASSWORD, USER_ALREADY_EXISTS, USER_NOT_FOUND } from '../constants/auth.error.constants';
import {hash, compare, genSalt} from 'bcrypt'
import { TokenService } from './token.service';
import { UserEntity } from 'src/user/entities/user.entity';
import { MailService } from 'src/mail/mail.service';
import { generateCode } from 'src/utils/gencode';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly tokenService: TokenService,
    private readonly mailService: MailService
  ){}

  async registration(dto: RegistrationDto) {
    const oldUser = await this.userService.byEmail(dto.email)

    if(oldUser) throw new BadRequestException(USER_ALREADY_EXISTS)

    const salt = await genSalt(8)
    const hashPassword = await hash(dto.password, salt)
    const code = generateCode()
    const user = await this.userService.create({...dto, password: hashPassword, code})
    
    // * send code to email
    this.mailService.sendCode(user.email, code)
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
    console.log(token)
    if(!token) return
    await this.tokenService.delete(token.id)
  }


  async codeVerification(code: number) {
    await this.userService.setAuthByCode(code)
    
  }


  private async generateAndSaveToken(user: UserEntity) {
    const tokens = this.tokenService.generateTokens(user)
    await this.tokenService.saveToken(tokens.refreshToken, user.id)

    return {
      ...tokens, 
      user: {
        isAuth: user.isAuth,
        email: user.email,
        name: user.name,
        surname: user.surname
      }
    }
  }
}
