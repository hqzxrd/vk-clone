import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseInterceptors, ParseIntPipe, UsePipes, ValidationPipe, UploadedFile, ParseFilePipe, FileTypeValidator } from '@nestjs/common';
import { UserService } from './user.service';
import { AccessJwtGuard } from 'src/auth/decorators/access-jwt.decorator';
import { User } from './decorators/user.decorator';
import { UpdateUserDto } from './dto/update-user.dto';
import { FileInterceptor, MulterFile } from '@webundsoehne/nest-fastify-file-upload';


@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

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
  @UseInterceptors(FileInterceptor('avatar'))
  @UsePipes(new ValidationPipe({whitelist: true}))
  @Patch()
  update(
    @User('id') id: number,
    @Body() updateDto: UpdateUserDto,
    @UploadedFile(
      new ParseFilePipe({
        fileIsRequired: false,
        validators: [new FileTypeValidator({fileType: /\/(jpg|jpeg|png)$/})],
      })
    ) file: MulterFile
  ) {
    return this.userService.update(id, updateDto, file)
  }
}
