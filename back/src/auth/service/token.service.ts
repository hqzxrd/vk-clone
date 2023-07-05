import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TokenEntity } from "../entities/token.entity";
import { Repository } from "typeorm";
import { UserEntity } from "src/user/entities/user.entity";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { ACCESS_SECRET, REFRESH_SECRET } from "../constants/auth.constants";

@Injectable()
export class TokenService {
    constructor(
        @InjectRepository(TokenEntity) private readonly tokenRepository: Repository<TokenEntity>,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService
    ) {}

    generateTokens({id, email, name, surname, }: UserEntity) {
        const payload = { id, email, name, surname}

        const accessToken = this.jwtService.sign(payload, {expiresIn: '30m', secret: this.configService.get(ACCESS_SECRET)})
        const refreshToken = this.jwtService.sign(payload, {expiresIn: '15d', secret: this.configService.get(REFRESH_SECRET)})

        return {accessToken, refreshToken}
    }

    async saveToken(token: string, userId: number) {
        const [oldTokens, count] = await this.tokenRepository.findAndCount({
            where: {user: {id: userId}},
            order: {createDate: 'ASC'}
        })

        const newToken = this.tokenRepository.create({refreshToken: token, user: {id: userId}})

        if(count === 3) {
            await this.delete(oldTokens[0].id)
        }
        await this.tokenRepository.save(newToken)
    }

    async byToken(refreshToken: string) {
        const token = await this.tokenRepository.findOne({where: {refreshToken}})
        return token
    }

    async delete(id: number) {
        await this.tokenRepository.delete(id)
    }

    async verifyAccessToken(accessToken: string) {
        try {
            const data = this.jwtService.verify(accessToken, {secret: this.configService.get(ACCESS_SECRET)})
            return data
        }catch(e) {
            return null
        }
    }
}