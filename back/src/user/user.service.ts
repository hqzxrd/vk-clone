import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { FindOptionsSelectByString, Repository } from 'typeorm';
import { DropboxService } from 'src/dropbox/dropbox.service';
import { MultipartFile } from '@fastify/multipart';
import { UpdateUserDto } from './dto/update-user.dto';
import { RegistrationDto } from 'src/auth/dto/registration.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
    private readonly dropboxService: DropboxService
  ){}

  private returnKeyUser: FindOptionsSelectByString<UserEntity> = [
      'id', 'createDate', 'birthday',
      'name', 'surname', 'nickname', 'status',
      'avatar', 'gender', 'city'
    ]
  
  async byEmail(email: string) {
    const user = await this.userRepository.findOne({
      where: {email}
    })
    return user
  }


  async create(dto: RegistrationDto) {
    const user = this.userRepository.create({...dto})
    return await this.userRepository.save(user)
  }

  async byId(id: number) {
    const user = await this.userRepository.findOne({
      where: {id},
      select: this.returnKeyUser
    })
    return user
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

  async getAll() {
    const users = await this.userRepository.find({
      select: this.returnKeyUser
    })
    return users
  }

  async update(id: number, dto: UpdateUserDto) {
    const user = await this.byId(id)
    if(!user) throw new UnauthorizedException()
    return await this.userRepository.save({...user, ...dto})
  }

  async checkUser(email: string) {
    const user = await this.userRepository.findOneBy({email})
    return user
  }
}
