import { ForbiddenException, Injectable } from '@nestjs/common';
import { SetRoleDto } from '../dto/set-role.dto';
import { UserService } from 'src/user/service/user.service';

@Injectable()
export class RolesService {
  constructor(
    private readonly userService: UserService
  ){}
  async setRole({role, userId}: SetRoleDto) {
    const user = await this.userService.setRole(userId, role)
    if(!user) throw new ForbiddenException()
  }
}
