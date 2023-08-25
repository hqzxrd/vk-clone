import { IsEnum, IsInt, NotEquals } from "class-validator"
import { Roles } from "../roles.enum"

export class SetRoleDto {

    @IsEnum(Roles)
    @NotEquals(Roles.OWNER)
    role: Roles

    @IsInt()
    userId: number
}