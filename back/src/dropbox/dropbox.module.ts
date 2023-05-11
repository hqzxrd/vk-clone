import { Module } from "@nestjs/common";
import { DropboxService } from "./dropbox.service";

@Module({
    providers: [DropboxService],
    exports: [DropboxService]
})
export class DropboxModule {}
