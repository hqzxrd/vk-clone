import { Injectable } from '@nestjs/common';
import { CheckMarkDto } from '../dto/set-check-mark.dto';
import { UserService } from 'src/user/service/user.service';

@Injectable()
export class AdminService {
  constructor(
    private readonly userService: UserService
  ){}

  async setCheckMark({userId, isCheckMark}: CheckMarkDto) {
    await this.userService.setCheckMark(userId, isCheckMark)
  }
}
