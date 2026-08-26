'use server'

import { DomainError } from '@/core/errors/DomainError';
import { redirect } from 'next/navigation';
import { SessionService } from '../../infrastructure/session/session.service';
import { makeLoginUseCase } from '../../main/factories/makeLoginUseCase';

// 1. Criamos a tipagem estrita para o estado da Action
export type AuthState = {
  success: boolean;
  error: string | null;
} | null;

// 2. Substituímos o 'any' por 'AuthState' e garantimos o retorno (Promise<AuthState>)
export async function loginAction(prevState: AuthState, formData: FormData): Promise<AuthState> {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  if (!email || !password) {
    return { success: false, error: 'E-mail e senha são obrigatórios.' };
  }

  try {
    const loginUseCase = makeLoginUseCase();
    const userDTO = await loginUseCase.execute(email, password);
    
    // Cria a sessão com os dados seguros do usuário
    await SessionService.createSession(userDTO);
  } catch (error) {
    if (error instanceof DomainError) {
     return { success: false, error: error instanceof Error ? error.message : 'Erro interno.' };
    }
    return { success: false, error: 'Erro interno no servidor.' };
  }

  // Redireciona APÓS o try-catch (regras do Next.js)
  redirect('/dashboard/inventory');
}

export async function logoutAction() {
  // Destrói o cookie da sessão
  await SessionService.destroySession();
  
  // Redireciona o usuário para o login
  redirect('/login');
}