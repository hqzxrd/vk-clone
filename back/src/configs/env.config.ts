import { ConfigModuleOptions } from '@nestjs/config'
import { IsNumber, IsString } from 'class-validator';
import { envValidate } from 'src/utils/env.validation';


export class EnvironmentVariables {
    // * Base environment
    @IsNumber()
    PORT: number
  
    // * database environment 
    @IsNumber()
    DB_PORT: number
  
    @IsString()
    DB_HOST: string
  
    @IsString()
    DB_USERNAME: string
  
    @IsString()
    DB_NAME: string
  
    @IsString()
    DB_PASSWORD: string
  
  
    // * mailer environment 
    @IsString()
    NM_HOST: string
  
    @IsNumber()
    NM_PORT: number
  
    @IsString()
    NM_USER: string
  
    @IsString()
    NM_PASS: string


    // * jwt secrets
    @IsString()
    ACCESS_JWT_SECRET: string

    @IsString()
    REFRESH_JWT_SECRET: string

}
  



export const EnvConfigOptions: ConfigModuleOptions = {
    validate: envValidate(EnvironmentVariables),
    isGlobal: true
}