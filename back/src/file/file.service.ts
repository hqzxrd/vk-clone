import { Injectable } from '@nestjs/common';
import { MulterFile } from '@webundsoehne/nest-fastify-file-upload';
import { randomUUID } from 'crypto';
import { mkdir, unlink, writeFile } from 'fs/promises';
import { join } from 'path';
import { exists } from 'src/utils/exists';

@Injectable()
export class FileService {
    async saveFile(file: MulterFile) {
        const [mimetype, type] = file.mimetype.split('/')

        const fileName = randomUUID() + '.' + type
        const uploadFolder = join(__dirname, '..', '../static') 
        const isDir = await exists(uploadFolder)

        if(!isDir) await mkdir(uploadFolder, {recursive: true})

        const dirMimetypePath = join(uploadFolder, '/' + mimetype)
        const isDirMimeType = await exists(dirMimetypePath)

        if(!isDirMimeType) await mkdir(dirMimetypePath, {recursive: true})

        await writeFile(join(dirMimetypePath, fileName), file.buffer)
        return mimetype + '/' + fileName
        
    }

    async deleteFile(filename: string) {
        const [dir, file] = filename.split('/')
        const pathFile = join(__dirname, '..', '../uploads', `/${dir}`, file)
        await unlink(pathFile)
    }
}
