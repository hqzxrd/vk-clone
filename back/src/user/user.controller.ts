import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseInterceptors, ParseIntPipe, UsePipes, ValidationPipe, UploadedFile, ParseFilePipe, FileTypeValidator } from '@nestjs/common';
import { UserService } from './user.service';
import { AccessJwtGuard } from 'src/auth/decorators/access-jwt.decorator';
import { User } from './decorators/user.decorator';
import { UpdateUserDto } from './dto/update-user.dto';
import { FileInterceptor, MulterFile } from '@webundsoehne/nest-fastify-file-upload';


@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseInterceptors(FileInterceptor('avatar'))
  @AccessJwtGuard()
  @Post('avatar')
  async uploadAvatar(
    @User('id') id: number,
    @UploadedFile(
      new ParseFilePipe({
        validators: [new FileTypeValidator({fileType: /\/(jpg|jpeg|png)$/})]
      })
    ) file: MulterFile
  ) {
    console.log(file)
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

  @AccessJwtGuard()
  @UsePipes(new ValidationPipe({whitelist: true}))
  @Patch()
  update(
    @User('id') id: number,
    @Body() updateDto: UpdateUserDto
  ) {
    return this.userService.update(id, updateDto)
  }
}
