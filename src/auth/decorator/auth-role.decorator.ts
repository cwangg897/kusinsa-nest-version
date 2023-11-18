import { UserRole } from '../../user/enum/roles.enum';
import { SetMetadata } from '@nestjs/common';

export const ROLE_KEY = 'roles';
// 데코레이터로 메타데이터를 넣는거 같음
export const HasRole = (...role: UserRole[]) => SetMetadata(ROLE_KEY, role);
