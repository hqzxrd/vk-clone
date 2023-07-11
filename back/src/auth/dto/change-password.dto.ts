import { IsString, MaxLength, MinLength } from "class-validator";

export class ChangePasswordDto {
    @IsString()
    password: string
    
    @IsString()
    @MaxLength(30)
    @MinLength(8)
    newPassword: string
}