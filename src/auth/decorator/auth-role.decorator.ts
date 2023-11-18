import { UserRole } from '../../user/enum/roles.enum';
import { SetMetadata } from '@nestjs/common';

export const ROLE_KEY = 'roles';
export const HasRole = (...role: UserRole[]) => SetMetadata(ROLE_KEY, role);
