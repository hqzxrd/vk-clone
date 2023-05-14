import { ExecutionContext, createParamDecorator } from "@nestjs/common";
import { UserEntity } from "../entities/user.entity";

type UserDecorator = Pick<UserEntity, 'id' | 'email' |'name' |'surname'>

export const User = createParamDecorator(
    (data: keyof UserDecorator, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest()
        const user = request.user
        return data ? user[data] : user
    }
)