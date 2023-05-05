import { Module } from "@nestjs/common";
import { DropBoxService } from "./dropbox.service";

@Module({
    providers: [DropBoxService],
    exports: [DropBoxService]
})
export class DropBoxModule {}
