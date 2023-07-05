import { IsInt } from "class-validator";
import { PaginationQueryDto } from "src/utils/pagination.query.dto";

export class GetMessagesDto extends PaginationQueryDto {
    @IsInt()
    id: number
}