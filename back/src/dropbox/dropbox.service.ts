import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Dropbox, files } from "dropbox";
import { randomUUID } from "crypto";
import { readFile } from "fs";
import { join } from "path";


@Injectable()
export class DropBoxService {
    private dbx: Dropbox

    constructor(
        private readonly configService: ConfigService
    ) {
        const accessToken = configService.get('DB_TOKEN')
        this.dbx = new Dropbox({accessToken})
        
    }


    async uploadFile(file: Express.Multer.File){
        const type = file.originalname.split('.').pop()
        const folder = file.mimetype.split('/')[0]
        const fileName = randomUUID()
        const filePath = `${folder}/${fileName}.${type}`
        await this.dbx.filesUpload({path: '/' + filePath, contents: file.buffer})
        return filePath
    }

    async getFile(fileName: string) {
        const file = await this.dbx.filesDownload({path: '/' + fileName}) as any
        return file.result.fileBinary
    }
}
