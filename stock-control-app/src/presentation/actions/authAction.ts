'use server'

import { z } from 'zod';
import { redirect } from 'next/navigation';
import { PrismaUserRepository } from '../../infrastructure/database/repositories/PrismaUserRepository';
import { BcryptCryptoService } from '../../infrastructure/security/BcryptCryptoService';
import { LoginUseCase } from '../../application/usecases/auth/LoginUseCase';
import { setAuthSession, destroyAuthSession } from '../../infrastructure/auth/session';
import { handleActionError } from '../../lib/errorHandler';

const loginSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(1, "A senha é obrigatória"),
});

const makeLoginUseCase = () => {
  const userRepository = new PrismaUserRepository();
  const cryptoService = new BcryptCryptoService();
  return new LoginUseCase(userRepository, cryptoService);
};

export async function loginAction(prevState: any, formData: FormData) {
  const data = Object.fromEntries(formData);
  const result = loginSchema.safeParse(data);

  if (!result.success) {
    return { error: result.error.issues[0].message };
  }

  const { email, password } = result.data;

  try {
    const useCase = makeLoginUseCase();
    const user = await useCase.execute(email, password);

    await setAuthSession(user);

    const destination = user.role === 'ALMOXARIFE'
      ? '/dashboard/inventory'
      : '/dashboard/request';

    return redirect(destination);

  } catch (error: unknown) {
    // Código limpo delegando o erro para o handler central
    return handleActionError(error);
  }
}

export async function logoutAction() {
  await destroyAuthSession();
  redirect('/login');
}