import { MultipartFile } from "@fastify/multipart";
import { ExecutionContext, createParamDecorator } from "@nestjs/common";
import { FastifyRequest } from "fastify";

export const File = createParamDecorator(
    (data: string, ctx: ExecutionContext) => {
        const request: FastifyRequest = ctx.switchToHttp().getRequest()
        const files = request.incomingFiles
        return data ? files.find((file: MultipartFile) => file.fieldname === data) : files
    }
)