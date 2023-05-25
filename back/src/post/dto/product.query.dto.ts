import { Type } from "class-transformer";
import { IsNumber, IsOptional } from "class-validator";
import { PaginationQueryDto } from "src/utils/pagination.query.dto";

export class ProductQueryDto extends PaginationQueryDto {
    @IsOptional()
    @IsNumber()
    @Type(() => Number)
    user?: number
}
