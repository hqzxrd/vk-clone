import { Module } from '@nestjs/common';
import { AdminService } from './service/admin.service';
import { AdminController } from './admin.controller';
import { UserModule } from 'src/user/user.module';
import { PostModule } from 'src/post/post.module';

@Module({
  controllers: [AdminController],
  providers: [AdminService],
  imports: [
    UserModule,
    PostModule
  ]
})
export class AdminModule {}
