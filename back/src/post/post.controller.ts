import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UsePipes, ValidationPipe, UseInterceptors, UploadedFiles, ParseFilePipe, FileTypeValidator, HttpCode, HttpStatus, Query } from '@nestjs/common';
import { PostService } from './service/post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { AccessJwtGuard } from 'src/auth/decorators/access-jwt.decorator';
import { User } from 'src/user/decorators/user.decorator';
import { FilesInterceptor,  MulterFile } from '@webundsoehne/nest-fastify-file-upload';
import { FindAllQueryDto } from './dto/findAll.query.dto';


@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @AccessJwtGuard()
  @UseInterceptors(FilesInterceptor('photos'))
  @UsePipes(new ValidationPipe({whitelist: true}))
  @Post()
  create(
    @Body() createPostDto: CreatePostDto,
    @User('id') id: number,
    @UploadedFiles(
      new ParseFilePipe({
        validators: [new FileTypeValidator({fileType: /\/(jpg|jpeg|png)$/})],
        fileIsRequired: false
      })
    ) photos: MulterFile[]
    ) {
    return this.postService.create(id, createPostDto, photos);
  }

  @AccessJwtGuard()
  @UsePipes(new ValidationPipe({transform: true}))
  @Get()
  findAll(
    @Query() {count, page, user} : FindAllQueryDto,
    @User('id') userId: number
  ) {
    return this.postService.findAll(page, count, user, userId);
  }

  @AccessJwtGuard()
  @Get(':id')
  findOne(
    @Param('id', ParseIntPipe) id: number,
    @User('id') userId: number  
  ) {
    return this.postService.findOne(id, userId);
  }

  @AccessJwtGuard()
  @UseInterceptors(FilesInterceptor('newPhotos'))
  @UsePipes(new ValidationPipe({whitelist: true}))
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @User('id') userId: number,
    @Body() updatePostDto: UpdatePostDto,
    @UploadedFiles(
      new ParseFilePipe({
        validators: [new FileTypeValidator({fileType: /\/(jpg|jpeg|png)$/})],
        fileIsRequired: false
      })
    ) files: MulterFile[]
  ) {
    return this.postService.update(id, userId, updatePostDto, files);
  }

  @AccessJwtGuard()
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  remove(
    @Param('id', ParseIntPipe) postId: number,
    @User('id') userId: number
  ) {
    return this.postService.remove(postId, userId);
  }

  @AccessJwtGuard()
  @Get('like/:id')
  async likePost(
    @User('id') userId: number,
    @Param('id', ParseIntPipe) postId: number
  ) {
    return this.postService.likePost(userId, postId)
  }
}
