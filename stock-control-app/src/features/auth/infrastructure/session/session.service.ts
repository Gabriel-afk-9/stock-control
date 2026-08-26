import { cookies } from 'next/headers';
import { AuthUserDTO } from '../../application/dtos/AuthUserDTO';

const SESSION_COOKIE_NAME = 'stock_control_session';

export class SessionService {
  static async createSession(user: AuthUserDTO): Promise<void> {
    const sessionData = JSON.stringify(user); 
    const encodedSession = Buffer.from(sessionData).toString('base64');

    const cookieStore = await cookies();
    cookieStore.set(SESSION_COOKIE_NAME, encodedSession, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 1 semana
    });
  }

  static async getSession(): Promise<AuthUserDTO | null> {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME);

    if (!sessionCookie?.value) {
      return null;
    }

    try {
      const decodedSession = Buffer.from(sessionCookie.value, 'base64').toString('utf-8');
      return JSON.parse(decodedSession) as AuthUserDTO;
    } catch {
      return null;
    }
  }

  static async destroySession(): Promise<void> {
    const cookieStore = await cookies();
    cookieStore.delete(SESSION_COOKIE_NAME);
  }
}