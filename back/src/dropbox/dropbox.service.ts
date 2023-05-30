import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Dropbox } from "dropbox";
import { randomUUID } from "crypto";
import { MulterFile } from "@webundsoehne/nest-fastify-file-upload";


@Injectable()
export class DropboxService {
    private dbx: Dropbox

    constructor(
        private readonly configService: ConfigService,
        private readonly logger: Logger,
    ) {
        const refreshToken = configService.get('DROPBOX_REFRESH')
        const clientId = configService.get('DROPBOX_CLIENT_ID')
        const clientSecret = configService.get('DROPBOX_CLIENT_SECRET')
        this.dbx = new Dropbox({ clientId, clientSecret, refreshToken })
    }


    async uploadFile(file: MulterFile){
        const type = file.originalname.split('.').pop()
        const [folder] = file.mimetype.split('/')
        const fileName = randomUUID()
        const filePath = `${folder}/${fileName}.${type}`
        await this.dbx.filesUpload({path: '/' + filePath, contents: file.buffer})
        return filePath
    }

    async getFile(fileName: string) {
        try {
            const file = await this.dbx.filesDownload({path: '/' + fileName}) as any
            return file.result.fileBinary
        }catch(e){
            throw new NotFoundException()
        }
        
    }


    async remove(path: string) {
        try {
            await this.dbx.filesDeleteV2({path: '/' + path})
        }catch(e) {
            this.logger.error(e.message)
        }
    }
}
