import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from '../auth.service';
import { UserRepository } from '../../user/entity/user.repository';

@Injectable()
export class TokeAuthGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    private readonly userRepository: UserRepository,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const rawToken = req.headers['authorization'];
    if (!rawToken) {
      throw new UnauthorizedException('토큰을 가지고있지 않습니다');
    }
    const split = rawToken.split(' ');
    // 토큰에서 정보뺴야할듯
    const payload = await this.authService.getPayload(split[1]);
    if(payload.type !== 'accessToken'){
      throw new UnauthorizedException('엑세스 토큰이 아닙니다');
    }

    const user = this.userRepository.findByEmail(payload.email);
    req.user = user;
    req.token = split[1];
    return true;
  }
}

// @Injectable()
// export class AccessTokenGuard extends TokeAuthGuard {
//   async canActivate(context: ExecutionContext): Promise<boolean> {
//     await super.canActivate(context);
//
//     const req = context.switchToHttp().getRequest();
//
//     if (req.tokenType !== 'accessToken') {
//       throw new UnauthorizedException('Access Token이 아닙니다.');
//     }
//     return true;
//   }
// }
