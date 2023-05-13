import { Controller, Get, Param, Res, StreamableFile } from "@nestjs/common";
import { DropboxService } from "./dropbox.service";
import { Readable } from 'stream'
import { FastifyReply } from "fastify";

@Controller('file')
export class DropboxController {
    constructor(
        private readonly dropboxService: DropboxService
    ){}

    @Get(':folder/:fileName')
    async getFile(
        @Param('folder') folder: string,
        @Param('fileName') fileName: string,
    ) {
        const buffer = await this.dropboxService.getFile(`${folder}/${fileName}`)
        const stream = Readable.from(buffer)
        return new StreamableFile(stream)
    }
}