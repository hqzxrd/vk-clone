import { IsDate, IsDateString, IsEmail, IsEnum, IsNumber, IsString, MaxLength, MinLength } from "class-validator"
import { Gender } from "../entities/user.entity"

export class CreateUserDto {
    @IsString()
    name: string

    @IsString()
    surname: string

    @IsDateString()
    birthday: Date

    @IsEnum(Gender)
    gender: Gender

    @IsEmail()
    email: string

    @IsNumber()
    code: number

    @IsString()
    @MaxLength(30)
    @MinLength(8)
    password: string
}
