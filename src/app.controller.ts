import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { HasRole } from './auth/decorator/auth-role.decorator';
import { UserRole } from './user/enum/roles.enum';
import { TokeAuthGuard } from './auth/guard/auth.guard';
import { RoleGuard } from './auth/guard/role.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @HasRole(UserRole.USER)
  @UseGuards(TokeAuthGuard)
  @Get('hello')
  getHello(): string {
    return 'hello';
  }
}
