import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Headers,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, SignupDto } from './dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @UseInterceptors(ClassSerializerInterceptor)
  async signup(@Body() dto: SignupDto) {
    return this.authService.signup(dto);
  }

  @Post('login')
  async login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @Post('rotate/refresh')
  async rotateRefreshToken(@Headers('authorization') rawToken: string) {
    return this.authService.rotateToken(rawToken, true);
  }

  @Post('rotate/access')
  async rotateAccessToken(@Headers('authorization') rawToken: string) {
    return this.authService.rotateToken(rawToken, false);
  }
}
