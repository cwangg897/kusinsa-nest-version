import { PickType } from '@nestjs/mapped-types';
import { User } from '../../user/entity/user.entity';

export class SignupDto extends PickType(User, ['email', 'password']) {}

export class LoginDto extends PickType(User, ['email', 'password']) {}
