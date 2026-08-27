'use client'

import { useActionState } from 'react';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { loginAction } from '../actions/auth.actions';

export function LoginForm() {
  const [state, formAction, isPending] = useActionState(loginAction, null);

  return (
    <form action={formAction} className="space-y-4 w-full max-w-sm">
      <div>
        <label htmlFor="email" className="block text-sm font-medium">E-mail</label>
        <Input id="email" name="email" type="email" required />
      </div>
      <div>
        <label htmlFor="password" className="block text-sm font-medium">Senha</label>
        <Input id="password" name="password" type="password" required />
      </div>
      
      {state?.error && (
        <p className="text-sm text-red-500">{state.error}</p>
      )}

      <Button type="submit" className="w-full" disabled={isPending}>
        {isPending ? 'Entrando...' : 'Entrar'}
      </Button>
    </form>
  );
}