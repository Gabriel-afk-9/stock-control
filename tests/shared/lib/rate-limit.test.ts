import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { rateLimit } from '@/shared/lib/rate-limit';

describe('rateLimit', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('permite até o limite e bloqueia quando excedido', async () => {
    const key = 'ip:1';
    expect(await rateLimit.check(key, 3, 1000)).toEqual({ success: true, remaining: 2 });
    expect(await rateLimit.check(key, 3, 1000)).toEqual({ success: true, remaining: 1 });
    expect(await rateLimit.check(key, 3, 1000)).toEqual({ success: true, remaining: 0 });
    expect(await rateLimit.check(key, 3, 1000)).toEqual({ success: false, remaining: 0 });
  });

  it('libera novamente após a janela expirar', async () => {
    const key = 'ip:2';
    await rateLimit.check(key, 2, 1000);
    await rateLimit.check(key, 2, 1000);
    expect((await rateLimit.check(key, 2, 1000)).success).toBe(false);

    vi.advanceTimersByTime(1001);
    const result = await rateLimit.check(key, 2, 1000);
    expect(result.success).toBe(true);
    expect(result.remaining).toBe(1);
  });

  it('chaves diferentes são independentes', async () => {
    expect((await rateLimit.check('a', 1, 1000)).success).toBe(true);
    expect((await rateLimit.check('b', 1, 1000)).success).toBe(true);
  });

  it('cleanup remove entradas expiradas', async () => {
    const key = 'ip:3';
    await rateLimit.check(key, 1, 1000);
    vi.advanceTimersByTime(1001);
    rateLimit.cleanup();

    const result = await rateLimit.check(key, 1, 1000);
    expect(result.success).toBe(true);
    expect(result.remaining).toBe(0);
  });
});
