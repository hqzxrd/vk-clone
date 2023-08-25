import { SetMetadata, UseGuards, applyDecorators } from "@nestjs/common";
import { Roles } from "../roles.enum";
import { AccessJwtGuard } from "src/auth/decorators/access-jwt.decorator";
import { RolesGuard } from "../guards/roles.guard";

export const ROLES_KEY = 'roles'

export const RolesAuth = (...roles: Roles[]) => {
    return applyDecorators(
        AccessJwtGuard(),
        SetMetadata(ROLES_KEY, roles),
        UseGuards(RolesGuard)
    )
}