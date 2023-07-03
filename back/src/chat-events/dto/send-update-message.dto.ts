import { IsInt } from "class-validator";
import { UpdateMessageDto } from "src/message/dto/update-message.dto";

export class SendUpdateMessageDto extends UpdateMessageDto {
    @IsInt()
    id: number
}