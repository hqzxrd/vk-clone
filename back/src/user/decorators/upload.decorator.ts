import { MultipartFile } from "@fastify/multipart";
import { BadRequestException, CanActivate, ExecutionContext, UseGuards } from "@nestjs/common";
import { FastifyRequest } from "fastify";
import { Observable } from "rxjs";


class UploadGuard implements CanActivate {

    constructor(private options?: UploadFileOptions) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request:  FastifyRequest = context.switchToHttp().getRequest()
        const files = await request.saveRequestFiles()

        const optionsFieldName = this.options.fieldName
        const optionsTypeFile = this.options.type
        let file: MultipartFile

        if(optionsFieldName) {
            file = files.find(file => file.fieldname == optionsFieldName)
            if(!file) throw new BadRequestException(`File in field "${optionsFieldName}" is not loaded`)

            if(optionsTypeFile)  {
                let boolean: Boolean
                if(typeof optionsTypeFile === 'string') boolean = optionsTypeFile === file.mimetype
                else boolean = !!file.mimetype.match(optionsTypeFile)
                if(!boolean) throw new BadRequestException(`File mimetype should be ${optionsTypeFile} `)
            }
            
        }

       request.incomingFiles = file ? [file] : files
       return true
    }
}

export interface UploadFileOptions {
    type?:  RegExp | string
    fieldName?: string
}


export const UploadFile = (options?: UploadFileOptions) => UseGuards(new UploadGuard(options)) 