import { UserRole } from '@/shared/kernel';

export interface AuthUserDTO {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}