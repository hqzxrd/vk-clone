import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe } from '@nestjs/common';
import { AdminService } from './service/admin.service';
import { RolesAuth } from 'src/roles/decorators/roles.decorator';
import { Roles } from 'src/roles/roles.enum';
import { CheckMarkDto } from './dto/set-check-mark.dto';

@RolesAuth(Roles.ADMIN, Roles.OWNER)
@UsePipes(new ValidationPipe())
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post()
  setVerify(
    @Body() checkMarkDto: CheckMarkDto
  ) {
    return this.adminService.setCheckMarkDto(checkMarkDto)
  }

  
}
