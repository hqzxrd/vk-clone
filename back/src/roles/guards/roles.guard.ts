import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { ROLES_KEY } from "../decorators/roles.decorator";
import { Roles } from "../roles.enum";

@Injectable()
export class RolesGuard implements CanActivate { 
    constructor(private reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean  {
        const roles = this.reflector.get<Roles[]>(ROLES_KEY, context.getHandler())
        if(!roles) return true
        const request = context.switchToHttp().getRequest()
        const user = request.user
        return roles.some(role => user.role === role)
    }
}