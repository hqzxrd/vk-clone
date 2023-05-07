import { IsEmail, IsNumber } from "class-validator";

export class CodeVerifDto {
    @IsEmail()
    email: string

    @IsNumber()
    code: number
}