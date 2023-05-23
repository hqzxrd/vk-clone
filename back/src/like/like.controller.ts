import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, HttpCode, HttpStatus } from '@nestjs/common';
import { LikeService } from './service/like.service';
import { CreateLikeDto } from './dto/create-like.dto';
import { UpdateLikeDto } from './dto/update-like.dto';
import { AccessJwtGuard } from 'src/auth/decorators/access-jwt.decorator';
import { User } from 'src/user/decorators/user.decorator';

@AccessJwtGuard()
@Controller('like')
export class LikeController {
  constructor(private readonly likeService: LikeService) {}

  // ! ?
  @Get()
  findAll() {
    return this.likeService.findAll();
  }

  
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  remove(
    @Param('id', ParseIntPipe) id: number,
    @User('id') userId: number
  ) {
    return this.likeService.remove(id, userId);
  }
}
