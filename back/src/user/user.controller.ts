import { Controller, Get, Post, Body, Patch, Param, Delete,UseInterceptors, ParseIntPipe, UsePipes, ValidationPipe, UploadedFile, ParseFilePipe, FileTypeValidator, UploadedFiles, HttpCode, HttpStatus, Query, forwardRef, Inject } from '@nestjs/common';
import { UserService } from './service/user.service';
import { AccessJwtGuard } from 'src/auth/decorators/access-jwt.decorator';
import { User } from './decorators/user.decorator';
import { UpdateUserDto } from './dto/update-user.dto';
import { FileInterceptor,  MulterFile } from '@webundsoehne/nest-fastify-file-upload';
import { PaginationQueryDto } from 'src/utils/pagination.query.dto';
import { FriendRequestQuery } from 'src/friend/dto/friend-request.query.dto';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
  ) {}


  @AccessJwtGuard()
  @Get(':key')
  profileByNicknameOrId(
    @Param('key') key: string,
    @User('id') userId: number
  ) {
    return this.userService.profileByUserKey(key, userId)
  }

  @UsePipes(new ValidationPipe({transform: true}))
  @AccessJwtGuard()
  @Get()
  getAll(
    @User('id') id: number,
    @Query() {count, page} : PaginationQueryDto
  ) {
    return this.userService.getAll(id, page, count)
  }

  @UsePipes(new ValidationPipe({transform: true}))
  @Get(':key/friends')
  async getFriends(
    @Param('key') key: string,
    @Query() {count, page} : PaginationQueryDto
  ) {
    return this.userService.getFriends(key, page, count)
  }

  @UsePipes(new ValidationPipe({transform: true}))
  @AccessJwtGuard()
  @Get('request')
  getFriendRequest(
    @User('id') id: number,
    @Query() {count, page, type} : FriendRequestQuery
  ) {
    return this.userService.getFriendRequest(id, type, page, count)
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

  @HttpCode(HttpStatus.NO_CONTENT)
  @AccessJwtGuard()
  @Delete()
  deleteAvatar(
    @User('id') id: number
  ) {
    return this.userService.deleteAvatar(id)
  }

  
}
