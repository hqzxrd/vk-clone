import { BadRequestException, ForbiddenException, Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { ConfirmationEntity } from "../entities/confirmation.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { NO_EMAIL_CONFIRMATION_REQUEST, USER_NOT_FOUND } from "../constants/auth.error.constants";
import { INCORRECT_CODE } from "src/user/constants/user.error.constants";

@Injectable()
export class ConfirmationService {
    constructor(
        @InjectRepository(ConfirmationEntity) private readonly confirmationRepository: Repository<ConfirmationEntity>,
    ) {}


    async setCodeOrCreate(email: string, code: number) {
        const oldConfirmation = await this.confirmationRepository.findOneBy({email})
        if(!oldConfirmation) {
            const newConfirmation = this.confirmationRepository.create({email, code})
            await this.confirmationRepository.save(newConfirmation)
            return
        }
        
        oldConfirmation.code = code
        await this.confirmationRepository.save(oldConfirmation)
    }

    async setAuthByCode(email: string, code: number) {
        const confirmation = await this.confirmationRepository.findOneBy({email})
        if(!confirmation) throw new BadRequestException(USER_NOT_FOUND)
        
        if(code !== confirmation.code) throw new BadRequestException(INCORRECT_CODE)

        confirmation.isAuth = true
        confirmation.code = null
        await this.confirmationRepository.save(confirmation)
    }

    async checkIsAuth(email: string) {
        const confirmation = await this.confirmationRepository.findOneBy({email})
        if(!confirmation) throw new ForbiddenException(NO_EMAIL_CONFIRMATION_REQUEST)
        return confirmation.isAuth
    }

    async delete(email: string) {
        await this.confirmationRepository.delete({email})
    }
}