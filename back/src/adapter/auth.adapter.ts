import { NestApplication } from "@nestjs/core";
import { NestFastifyApplication } from "@nestjs/platform-fastify";
import { IoAdapter } from "@nestjs/platform-socket.io";
import { WsException } from "@nestjs/websockets";
import { NextFunction } from "express";
import { Server, ServerOptions, Socket } from "socket.io";
import { TokenService } from "src/auth/service/token.service";
import { UserEntity } from "src/user/entities/user.entity";


export class SocketUser extends Socket {
    user: Pick<UserEntity, 'id' | 'email' | 'name' | 'surname'> 
}


export class AuthAdapter extends IoAdapter {

    constructor(
        private readonly app: NestFastifyApplication,
    ) {
        super(app)
    }

    createIOServer(port: number, options?: ServerOptions) {
        const server: Server = super.createIOServer(port, options)
        server.use(async (socket: SocketUser, next: NextFunction) => {
            try {
                const token = socket.handshake.auth.token
                if(!token) throw new WsException('Unauthorized')
                const tokenService = this.app.get(TokenService)
                const user = await tokenService.verifyAccessToken(token)
                if(!user) throw new WsException('Unauthorized')
                socket.user = user
                next()
            }catch(e) {
                next(e)
            }
        })

        return server
    }
}