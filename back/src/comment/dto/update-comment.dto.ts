import { PartialType } from '@nestjs/swagger';
import { CreateCommentDto } from './create-comment.dto';
import { PickType } from '@nestjs/mapped-types';

export class UpdateCommentDto extends PartialType(PickType(CreateCommentDto, ['text'])) {}
