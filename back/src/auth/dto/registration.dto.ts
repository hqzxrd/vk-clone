import { PickType } from "@nestjs/mapped-types";
import { CreateUserDto } from "src/user/dto/create-user.dto";

export class RegistrationDto extends PickType(CreateUserDto, ['email', 'password', 'birthday', 'gender', 'name', 'surname']){}
