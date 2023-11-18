import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { LoginDto, SignupDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { UserRepository } from '../user/entity/user.repository';
import { User } from '../user/entity/user.entity';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly userRepositroy: UserRepository,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  /**
   * 회원가입 중복확인
   * 비밀번호 암호화
   */
  async signup(dto: SignupDto) {
    // 비밀번호는 여기서 암호화 시켜서 보내기
    const hash = await bcrypt.hash(
      dto.password,
      +this.configService.get<number>('HASH_ROUND'),
    );
    return this.userService.createUser({
      ...dto,
      password: hash,
    });
  }

  /**
   * 토큰 로그인
   * 0. 존재하는지 확인
   * 1. 비밀번호 확인
   * 2. 토큰 제공하기
   */
  async login(dto: LoginDto) {
    const user = await this.userRepositroy.findByEmail(dto.email);
    if (!user) {
      throw new BadRequestException('존재하지 않는 유저입니다');
    }
    const passOk = bcrypt.compare(dto.password, user.password);
    if (!passOk) {
      throw new UnauthorizedException('비밀번호가 일치하지 않습니다');
    }
    return {
      refreshToken: this.generateToken(user, true),
      accessToken: this.generateToken(user, false),
    };
  }

  private generateToken(
    user: Pick<User, 'email' | 'id'>,
    isRefreshToken: boolean,
  ) {
    const payload = {
      email: user.email,
      type: isRefreshToken ? 'refreshToken' : 'accessToken',
      id: user.id,
    };
    return this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_SECRET'),
      expiresIn: isRefreshToken ? 3600 : 300,
    });
  }

  // 토큰재발급
  async rotateToken(rawToken: string, isRefreshToken: boolean) {
    const split = rawToken.split(' ');
    const decoded = await this.jwtService.verify(split[1], {
      secret: this.configService.get<string>('JWT_SECRET'),
    });
    if (decoded.type !== 'refreshToken') {
      throw new UnauthorizedException(
        '토큰 재발급은 refreshToken으로만 가능합니다',
      );
    }
    return this.generateToken(decoded, isRefreshToken);
  }
}
