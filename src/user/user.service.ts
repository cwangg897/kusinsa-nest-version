import { BadRequestException, Injectable } from '@nestjs/common';
import { SignupDto } from '../auth/dto/create-user.dto';
import { UserRepository } from './entity/user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}
  async createUser(dto: SignupDto) {
    const exists = await this.userRepository.existsByEmail(dto.email);
    if (exists) {
      throw new BadRequestException('이미 존재하는 이메일입니다');
    }

    return this.userRepository.createUser(dto);
  }
}
