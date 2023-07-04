import { ArgumentsHost, Catch,  HttpException } from "@nestjs/common";
import { BaseWsExceptionFilter, WsException } from "@nestjs/websockets";

@Catch()
export class WsExceptionFilter extends BaseWsExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost): void {
        console.log(exception)
        if(exception instanceof HttpException) {
            const properException = new WsException(exception.getResponse());
            super.catch(properException, host);
        }else {
            super.catch(new WsException({status: 500, message: 'Internal server error'}), host)
        }
    }
}