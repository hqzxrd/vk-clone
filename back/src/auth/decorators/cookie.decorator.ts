import { ExecutionContext, createParamDecorator } from "@nestjs/common";
import { FastifyRequest } from "fastify";

export const Cookie = createParamDecorator(
    (data: string, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest() as FastifyRequest
        const cookies = request.cookies
        return data ? cookies[data] : cookies
    }
)