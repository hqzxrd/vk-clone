import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, UsePipes, ValidationPipe } from '@nestjs/common';
import { RolesService } from './service/roles.service';
import { SetRoleDto } from './dto/set-role.dto';
import { RolesAuth } from './decorators/roles.decorator';
import { Roles } from './roles.enum';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @HttpCode(HttpStatus.NO_CONTENT)
  @RolesAuth(Roles.OWNER)
  @UsePipes(new ValidationPipe())
  @Post()
  setRole(
    @Body() setRoleDto: SetRoleDto
  ) {
    return this.rolesService.setRole(setRoleDto)
  }
}
