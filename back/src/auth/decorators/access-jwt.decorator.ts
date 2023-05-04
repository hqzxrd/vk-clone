import { AuthGuard } from "@nestjs/passport";
import { ACCESS_JWT_STRATEGY } from "../constants/auth.constants";
import { UseGuards } from "@nestjs/common";

export const AccessJwtGuard = () => UseGuards(AuthGuard(ACCESS_JWT_STRATEGY))