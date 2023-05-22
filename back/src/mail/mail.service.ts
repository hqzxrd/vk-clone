import { MailerService } from "@nestjs-modules/mailer";
import { Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class MailService {
    constructor(
        private readonly mailerService: MailerService,
        private readonly logger: Logger,
        private readonly configService: ConfigService
    ){}


    async sendCode(email: string, code: number) {
        try {
            await this.mailerService.sendMail({
                to: email,
                from: this.configService.get('NM_USER'),
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