import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { INCORRECT_CODE } from './constants/user.error.constants';
import { USER_NOT_FOUND } from 'src/auth/constants/auth.error.constants';
import { DropboxService } from 'src/dropbox/dropbox.service';
import { MultipartFile } from '@fastify/multipart';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
    private readonly dropboxService: DropboxService
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
      where: {id},
      select: [
        'avatar', 'birthday', 'city', 
        'createDate', 'name', 'nickname', 
        'status', 'gender', 'email', 'id'
      ]
    })
    return user
  }
  
  async setAuthByCode(code: number, email: string) {
    const user = await this.userRepository.findOne({
      where: {email}
    })

    if(!user) throw new BadRequestException(USER_NOT_FOUND)
  
    if(code !== user.code) throw new BadRequestException(INCORRECT_CODE)

    user.isAuth = true
    user.code = null
    console.log(user)
    await this.userRepository.save(user)
  }


  async uploadAvatar(id: number, file: MultipartFile) {
    const user = await this.userRepository.findOne({
      where: {id}
    })
    if(!user) throw new UnauthorizedException()

    const filename = await this.dropboxService.uploadFile(file)
    
    user.avatar = filename
    await this.userRepository.save(user)

    return filename
  }
}
