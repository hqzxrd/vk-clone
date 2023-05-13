import { Injectable, NotFoundException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Dropbox } from "dropbox";
import { randomUUID } from "crypto";
import { MultipartFile } from "@fastify/multipart";


@Injectable()
export class DropboxService {
    private dbx: Dropbox

    constructor(
        private readonly configService: ConfigService
    ) {
        const refreshToken = configService.get('DROPBOX_REFRESH')
        const clientId = configService.get('DROPBOX_CLIENT_ID')
        const clientSecret = configService.get('DROPBOX_CLIENT_SECRET')
        this.dbx = new Dropbox({ clientId, clientSecret, refreshToken })
    }


    async uploadFile(file: MultipartFile){
        const type = file.filename.split('.').pop()
        const folder = file.mimetype.split('/')[0]
        const fileName = randomUUID()
        const filePath = `${folder}/${fileName}.${type}`
        const buffer = await file.toBuffer()
        await this.dbx.filesUpload({path: '/' + filePath, contents: buffer})
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
}
