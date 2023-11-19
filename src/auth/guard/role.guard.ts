import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { UserRole } from '../../user/enum/roles.enum';
import { ROLE_KEY } from '../decorator/auth-role.decorator';
import { AuthService } from '../auth.service';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly authService: AuthService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    // HasRole로 넣은 메타데이터
    const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(
      ROLE_KEY,
      [context.getHandler(), context.getClass()],
    );
    /**
     * context에서 token에서 역할을 빼내야함
     *
     */
    const req = context.switchToHttp().getRequest();
    const user = await req.user;
    // role을 여러개 가질 수 있다면?...
    for (const role of requiredRoles) {
      if (role === UserRole.ALL) return true;
      if (user.role === role) return true;
    }
    return false;
  }
}
