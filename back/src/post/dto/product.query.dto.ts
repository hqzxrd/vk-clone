import { Type } from "class-transformer";
import { IsNumber, IsOptional, IsString } from "class-validator";
import { PaginationQueryDto } from "src/utils/pagination.query.dto";

export class ProductQueryDto extends PaginationQueryDto {
    @IsOptional()
    @IsString()
    user?: string
}
