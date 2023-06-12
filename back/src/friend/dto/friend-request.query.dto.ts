import { IsEnum } from "class-validator";
import { PaginationQueryDto } from "src/utils/pagination.query.dto";
import { FriendRequestType } from "../friend-request.enum";

export class FriendRequestQuery extends PaginationQueryDto {
    @IsEnum(FriendRequestType)
    type: FriendRequestType
}