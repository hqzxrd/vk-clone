import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { DropboxService } from 'src/dropbox/dropbox.service';
import { UpdateUserDto } from '../dto/update-user.dto';
import { RegistrationDto } from 'src/auth/dto/registration.dto';
import { MulterFile } from '@webundsoehne/nest-fastify-file-upload';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
    private readonly dropboxService: DropboxService
  ){}

  readonly returnKeyUser: (keyof UserEntity)[] = [
      'id', 'createDate', 'birthday',
      'name', 'surname', 'nickname', 'status',
      'avatar', 'gender', 'city'
    ]
  
  async byEmail(email: string) {
    const user = await this.userRepository.findOneBy({email})
    return user
  }

  async byId(id: number) {
    const user = await this.userRepository.findOne({
      where: {id},
      select: this.returnKeyUser
    })
    return user
  }

  async create(dto: RegistrationDto) {
    const user = this.userRepository.create({...dto})
    return await this.userRepository.save(user)
  }

  async getAll() {
    const users = await this.userRepository.find({
      select: this.returnKeyUser
    })
    return users
  }

  async update(id: number, dto: UpdateUserDto, file?: MulterFile) {
    const user = await this.byId(id)
    if(!user) throw new UnauthorizedException()

    if(file) {
      if(user.avatar) this.dropboxService.remove(user.avatar)
      let url: string
      await Promise.all(url = (await this.dropboxService.uploadFile(file)).url)
      dto.avatar = url
    }
    
    const updatedUser = await this.userRepository.save({...user, ...dto})
    delete updatedUser.code
    delete updatedUser.updateDate
    return updatedUser
  }

  async deleteAvatar(id: number){
    const user = await this.byId(id)
    if(!user) throw new UnauthorizedException()
    if(user.avatar) {
      this.dropboxService.remove(user.avatar)
    }
    user.avatar = null
    await this.userRepository.save(user)
  }
}
