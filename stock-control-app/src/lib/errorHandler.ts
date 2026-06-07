import { isRedirectError } from 'next/dist/client/components/redirect';
import { DomainError } from '../domain/exceptions/DomainError';

export function handleActionError(error: unknown): { error: string } {
  // Sempre deixe o Next.js lidar com os redirecionamentos dele
  if (isRedirectError(error)) {
    throw error;
  }

  if (error instanceof DomainError) {
    return { error: error.message };
  }

  if (error instanceof Error) {
    // Aqui você poderia plugar o Sentry, Datadog ou outro logger no futuro
    console.error('[System Error]:', error.message);
    return { error: "Ocorreu um erro inesperado. Tente novamente mais tarde." };
  }

  console.error('[Unknown Error]:', error);
  return { error: "Falha crítica no sistema." };
}