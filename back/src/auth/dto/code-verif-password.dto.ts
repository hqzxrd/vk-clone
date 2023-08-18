import { IsString, MaxLength, MinLength } from "class-validator";
import { CodeVerifDto } from "./code-verif.dto";

export class CodeVerifPasswordDto extends CodeVerifDto {
    @IsString()
    @MaxLength(30)
    @MinLength(8)
    password: string
}