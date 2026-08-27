import { logger } from './logger';
import { DomainError } from '@/core/errors/DomainError';

export interface ActionErrorResult {
  success: false;
  message: string;
}

export function handleActionError(error: unknown, context: string): ActionErrorResult {
  if (error instanceof DomainError) {
    logger.warn({ context, message: error.message }, 'Erro de domínio em Server Action');
    return { success: false, message: error.message };
  }

  logger.error({ context, err: error }, 'Erro inesperado em Server Action');
  return { success: false, message: 'Erro interno no servidor.' };
}
