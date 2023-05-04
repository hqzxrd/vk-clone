import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { USER_NOT_FOUND } from './constants/auth.error.constants';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>
  ){}
  
  async byEmail(email: string) {
    const user = await this.userRepository.findOne({
      where: {email}
    })
    return user
  }


  async create(dto: CreateUserDto) {
    const user = this.userRepository.create({...dto})
    return await this.userRepository.save(user)
  }

  async byId(id: number) {
    const user = await this.userRepository.findOne({
      where: {id}
    })
    return user
  }
  
  async setAuthByCode(code: number) {
    const user = await this.userRepository.findOne({
      where: {code}
    })

    if(!user) throw new BadRequestException(USER_NOT_FOUND)

    user.isAuth = true
    user.code = null

    await this.userRepository.save(user)
  }
}
