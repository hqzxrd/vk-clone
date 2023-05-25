import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, ParseIntPipe, HttpStatus, HttpCode, Query } from '@nestjs/common';
import { CommentService } from './service/comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { AccessJwtGuard } from 'src/auth/decorators/access-jwt.decorator';
import { User } from 'src/user/decorators/user.decorator';
import { CommentQueryDto } from './dto/comment.query.dto';

@AccessJwtGuard()
@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @UsePipes(new ValidationPipe())
  @Post()
  create(
    @Body() createCommentDto: CreateCommentDto,
    @User('id') id: number,
  ) {
    return this.commentService.create(createCommentDto, id);
  }

  @Get(':id')
  findOne(
    @Param('id', ParseIntPipe) id: number,
    @User('id') userId: number  
  ) {
    return this.commentService.findOne(id, userId);
  }

  @UsePipes(new ValidationPipe({whitelist: true}))
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number, 
    @Body() updateCommentDto: UpdateCommentDto,
    @User('id') userId: number
  ) {
    return this.commentService.update(id, updateCommentDto, userId);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  remove(
    @User('id') userId: number,
    @Param('id', ParseIntPipe) id: number
  ) {
    return this.commentService.remove(id, userId);
  }

  @UsePipes(new ValidationPipe({transform: true}))
  @Get()
  findAllByPostId(
    @Query() {count, page, post} : CommentQueryDto,
    @User('id') userId: number
  ) {
    return this.commentService.findAllByPostId(page, count, post, userId) 
  }

  @Get('like/:id')
  async likeComment(
    @User('id') userId: number, 
    @Param('id', ParseIntPipe) commentId: number
  ) {
    return this.commentService.likeComment(userId, commentId)
  }
}
