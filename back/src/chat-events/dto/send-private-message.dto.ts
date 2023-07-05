import { IsInt, IsString } from "class-validator";

export class SendPrivateChatDto  {
    @IsString()
    text: string

    @IsInt()
    toUserId: number
}
