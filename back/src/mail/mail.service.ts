import { MailerService } from "@nestjs-modules/mailer";
import { Injectable } from "@nestjs/common";

@Injectable()
export class MailService {
    constructor(
        private readonly mailerService: MailerService
    ){}


    async sendCode(email: string, code: number) {
        this.mailerService.sendMail({
            to: email,
            from: 'VkClone',
            subject: 'Подтверждение почты',
            text: '',
            html: `
            <div>
            <h1>Ваш код активации</h1>
            <h1>${code}</h1>
            </div>
            `
        })
    }
}