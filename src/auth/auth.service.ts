import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { SignupDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  /**
   * 회원가입 중복확인
   * 비밀번호 암호화
   */
  async signup(dto: SignupDto) {
    // 비밀번호는 여기서 암호화 시켜서 보내기
    const hash = await bcrypt.genSalt(dto.password, 10);
    return this.userService.createUser({
      ...dto,
      password: hash,
    });
  }
}
