import { UserRole } from '../../../users/domain/entities/User';

export interface AuthUserDTO {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}