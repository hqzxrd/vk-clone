import { IsEnum, IsInt, IsString } from "class-validator";
import { MessageType } from "../message.type.enum";

export class CreateMessageDto {
    @IsInt()
    userId: number

    @IsEnum(MessageType)
    type: MessageType

    @IsString()
    text: string

    @IsInt()
    columnId: number
}
