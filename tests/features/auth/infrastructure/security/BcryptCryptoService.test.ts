import { describe, it, expect } from 'vitest';
import { BcryptCryptoService } from '@/features/auth/infrastructure/security/BcryptCryptoService';

describe('BcryptCryptoService', () => {
  const service = new BcryptCryptoService();

  it('hash gera valor diferente do plaintext e é verificável', async () => {
    const hash = await service.hash('secret123');
    expect(hash).not.toBe('secret123');
    expect(await service.compare('secret123', hash)).toBe(true);
  });

  it('compare retorna false para senha incorreta', async () => {
    const hash = await service.hash('secret123');
    expect(await service.compare('wrong', hash)).toBe(false);
  });
});
