import { describe, it, expect } from 'vitest';
import { InvalidCredentialsError } from './InvalidCredentialsError';

describe('InvalidCredentialsError', () => {
  it('é uma instância de Error', () => {
    expect(new InvalidCredentialsError()).toBeInstanceOf(Error);
  });

  it('tem mensagem padrão amigável', () => {
    const error = new InvalidCredentialsError();
    expect(error.message).toBe('Credenciais inválidas.');
    expect(error.name).toBe('InvalidCredentialsError');
  });

  it('aceita mensagem customizada', () => {
    const error = new InvalidCredentialsError('Bloqueado');
    expect(error.message).toBe('Bloqueado');
  });
});
