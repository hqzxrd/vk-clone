import { ArgumentsHost, Catch,  HttpException } from "@nestjs/common";
import { BaseWsExceptionFilter, WsException } from "@nestjs/websockets";

@Catch()
export class WsExceptionFilter extends BaseWsExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost): void {
        const properException = new WsException(exception.getResponse());
        super.catch(properException, host);
    }
}