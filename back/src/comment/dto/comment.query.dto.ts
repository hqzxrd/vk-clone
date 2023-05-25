import { Type } from "class-transformer";
import { IsNumber } from "class-validator";
import { PaginationQueryDto } from "src/utils/pagination.query.dto";

export class CommentQueryDto extends PaginationQueryDto {
    @IsNumber()
    @Type(() => Number)
    post: number
}