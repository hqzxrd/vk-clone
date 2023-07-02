import { PartialType } from '@nestjs/mapped-types';
import { CreateChatEventDto } from './create-chat-event.dto';

export class UpdateChatEventDto extends PartialType(CreateChatEventDto) {
  id: number;
}
