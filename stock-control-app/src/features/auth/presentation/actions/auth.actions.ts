'use server'

import { DomainError } from '@/core/errors/DomainError';
import { InvalidCredentialsError } from '../../domain/errors/InvalidCredentialsError';
import { redirect } from 'next/navigation';
import { SessionService } from '../../infrastructure/session/session.service';
import { makeLoginUseCase } from '../../main/factories/makeLoginUseCase';
import { z } from 'zod';
import { rateLimit } from '@/shared/lib/rate-limit';

const loginSchema = z.object({
  email: z.string().email('E-mail inválido'),
  password: z.string().min(1, 'Senha é obrigatória'),
});

export type AuthState = {
  success: boolean;
  error: string | null;
} | null;

export async function loginAction(prevState: AuthState, formData: FormData): Promise<AuthState> {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  const validation = loginSchema.safeParse({ email, password });
  if (!validation.success) {
    return { success: false, error: validation.error.issues[0].message };
  }

  const ip = 'unknown';
  const { success: rateLimitOk } = await rateLimit.check(ip, 5, 60 * 1000);
  if (!rateLimitOk) {
    return { success: false, error: 'Muitas tentativas. Tente novamente em 1 minuto.' };
  }

  try {
    const loginUseCase = makeLoginUseCase();
    const result = await loginUseCase.execute(validation.data);
    
    await SessionService.createSession(result.user);
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      return { success: false, error: error.message };
    }
    if (error instanceof DomainError) {
      return { success: false, error: error.message };
    }
    return { success: false, error: 'Erro interno no servidor.' };
  }

  redirect('/dashboard/inventory');
}

export async function logoutAction() {
  await SessionService.destroySession();
  redirect('/login');
}