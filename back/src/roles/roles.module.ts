import { Module } from '@nestjs/common';
import { RolesService } from './service/roles.service';
import { RolesController } from './roles.controller';
import { UserModule } from 'src/user/user.module';
import { RolesGuard } from './guards/roles.guard';

@Module({
  imports: [
    UserModule
  ],
  controllers: [RolesController],
  providers: [RolesService, RolesGuard]
})
export class RolesModule {}
