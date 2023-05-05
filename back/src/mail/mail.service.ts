import { MailerService } from "@nestjs-modules/mailer";
import { Injectable, Logger } from "@nestjs/common";

@Injectable()
export class MailService {
    constructor(
        private readonly mailerService: MailerService,
        private readonly logger: Logger
    ){}


    async sendCode(email: string, code: number) {
        try {
            await this.mailerService.sendMail({
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
        }catch(e) {
            this.logger.error(e.message)
        }
        
    }
}