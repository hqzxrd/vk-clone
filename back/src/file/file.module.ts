import { FileService } from './file.service';
import { Module } from '@nestjs/common';

@Module({
    imports: [],
    providers: [
        FileService, 
    ],
    exports: [FileService]
})
export class FileModule {}
