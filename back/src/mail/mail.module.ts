import { Module } from "@nestjs/common";
import { MailService } from "./mail.service";
import { MailerModule } from "@nestjs-modules/mailer";

@Module({
    providers: [MailService],
    exports: [MailService],
    imports: [
        MailerModule
    ]
})
export class MailModule {}