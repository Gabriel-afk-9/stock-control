import { redirect } from 'next/navigation';
import { SessionService } from '@/features/auth/infrastructure/session/session.service';
import { AuthUserDTO } from '@/features/auth/application/dtos/AuthUserDTO';

export async function requireSession(): Promise<AuthUserDTO> {
  const user = await SessionService.getSession();
  
  if (!user) {
    redirect('/login');
  }
  
  return user;
}

export async function requireRole(allowedRoles: AuthUserDTO['role'][]): Promise<AuthUserDTO> {
  const user = await requireSession();
  
  if (!allowedRoles.includes(user.role)) {
    redirect('/dashboard?error=unauthorized');
  }
  
  return user;
}

export async function getOptionalSession(): Promise<AuthUserDTO | null> {
  return SessionService.getSession();
}