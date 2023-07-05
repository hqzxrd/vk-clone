import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { WsException } from "@nestjs/websockets";
import { Socket } from "socket.io";
import { TokenService } from "src/auth/service/token.service";

@Injectable()
export class WsAccessJwtGuard implements CanActivate {

    constructor(
        private readonly tokenService: TokenService
    ){}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        try {
            const socket: Socket = context.switchToWs().getClient()
            // console.log(socket)
            const accessToken = socket.handshake.auth.token
            console.log(accessToken)
            if(!accessToken) return false
            const user = await this.tokenService.verifyAccessToken(accessToken)
            console.log(user)
            if(!user) return false
            return true
        }catch(e) {
            throw new WsException(e.message)
        }
    }
}