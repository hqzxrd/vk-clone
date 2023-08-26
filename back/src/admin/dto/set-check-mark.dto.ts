import { IsBoolean, IsInt } from "class-validator"

export class CheckMarkDto {
    @IsInt()
    userId: number

    @IsBoolean()
    isCheckMark: boolean
}