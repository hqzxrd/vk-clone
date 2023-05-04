import { MailerOptions } from "@nestjs-modules/mailer";
import { ConfigService } from "@nestjs/config";

export const getMailerConfig = (configService: ConfigService): MailerOptions => {
    const host = configService.get('NM_HOST')
    const port = configService.get('NM_PORT')
    const user = configService.get('NM_USER')
    const pass = configService.get('NM_PASS')
    
    return {
        transport: {
            host, port,
            auth: {
                user,
                pass
            },
            secure: false
        }
    }
}