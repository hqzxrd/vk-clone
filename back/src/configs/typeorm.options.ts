import { ConfigService } from "@nestjs/config";
import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const getTypeormOptions = (configService: ConfigService): TypeOrmModuleOptions => ({
    port: configService.get('DB_PORT'),
    host: configService.get('DB_HOST'),
    username: configService.get('DB_USERNAME'),
    database: configService.get('DB_NAME'),
    password: configService.get('DB_PASSWORD'),
    type: 'postgres',
    synchronize: true,
    autoLoadEntities: true
})