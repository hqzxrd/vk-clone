import { Type } from "class-transformer";
import { IsString } from "class-validator";
import { PaginationQueryDto } from "src/utils/pagination.query.dto";

export class GetMessagesDto extends PaginationQueryDto {
    @Type(() => String)
    @IsString()
    userKey: number | string
}