import { Module } from "@nestjs/common";
import { DropboxService } from "./dropbox.service";
import { DropboxController } from "./dropbox.controller";

@Module({
    controllers: [DropboxController],
    providers: [DropboxService],
    exports: [DropboxService]
})
export class DropboxModule {}
