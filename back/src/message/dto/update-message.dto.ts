import { CreateMessageDto } from './create-message.dto';
import { PickType } from '@nestjs/mapped-types';

export class UpdateMessageDto extends PickType(CreateMessageDto, ['text']) {}
