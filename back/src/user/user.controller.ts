import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseInterceptors, ParseIntPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { AccessJwtGuard } from 'src/auth/decorators/access-jwt.decorator';
import { User } from './decorators/user.decorator';
import { UploadFile } from './decorators/upload.decorator';
import { File } from './decorators/file.decorator';
import { MultipartFile } from '@fastify/multipart';


@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UploadFile({fieldName: 'avatar', type:  /\/(jpg|jpeg|png)$/})
  @AccessJwtGuard()
  @Post('avatar')
  async uploadAvatar(
    @User('id') id: number,
    @File('avatar') file: MultipartFile
  ) {
    const url = await this.userService.uploadAvatar(id, file)
    return {url}
  }

  @Get(':id')
  getOne(
    @Param('id', ParseIntPipe) id: number
  ) {
    return this.userService.byId(id)
  }

  @Get()
  getAll() {
    return this.userService.getAll()
  }
}
