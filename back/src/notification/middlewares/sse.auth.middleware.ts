import { Injectable, NestMiddleware } from "@nestjs/common";
import { FastifyRequest } from "fastify/types/request";


@Injectable()
export class SseMiddleware implements NestMiddleware {
    use(req: FastifyRequest<{Querystring: {token?: string}}>, _res, next: (error?: unknown) => void) {
        const token = req.query.token
        req.headers.authorization = `Bearer ${token}`
        next()
    }
}