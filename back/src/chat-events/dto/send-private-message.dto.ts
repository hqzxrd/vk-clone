import { Type } from "class-transformer";
import { IsString } from "class-validator";

export class SendPrivateChatDto  {
    @IsString()
    text: string

    @Type(() => String)
    @IsString()
    toUserKey: string | number
}
