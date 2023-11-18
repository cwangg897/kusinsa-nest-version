import { Injectable } from '@nestjs/common';
import {SignupDto} from '../auth/dto/create-user.dto';

@Injectable()
export class UserService {
    constructor() {
    }
  createUser(dto: SignupDto) {}
}
