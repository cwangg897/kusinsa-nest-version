import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { User } from './user.entity';
import { SignupDto } from '../../auth/dto/create-user.dto';

@Injectable()
export class UserRepository {
  private userRepository: Repository<User>;

  constructor(private readonly dataSource: DataSource) {
    this.userRepository = this.dataSource.getRepository(User);
  }

  async createUser(dto: SignupDto) {
    const user = this.userRepository.create({
      ...dto,
    });
    const newUser = await this.userRepository.save(user);
    return newUser;
  }

  async existsByEmail(email: string) {
    return this.userRepository.exist({
      where: {
        email,
      },
    });
  }

  async findByEmail(email: string) {
    return this.userRepository.findOne({
      where: {
        email,
      },
    });
  }
}
