import {Global, Module} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import {TokeAuthGuard} from './guard/auth.guard';
import {RoleGuard} from './guard/role.guard';

@Global()
@Module({
  imports: [UserModule, JwtModule.register({})],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [UserModule, AuthService],
})
export class AuthModule {}
