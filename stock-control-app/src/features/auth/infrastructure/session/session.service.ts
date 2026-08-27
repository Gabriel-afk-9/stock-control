import { cookies } from 'next/headers';
import { SignJWT, jwtVerify } from 'jose';
import { AuthUserDTO } from '../../application/dtos/AuthUserDTO';

const SESSION_COOKIE_NAME = 'stock_control_session';
const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || 'dev-secret-change-in-production-min-32-chars');
const JWT_ALG = 'HS256';

export class SessionService {
  static async createSession(user: AuthUserDTO): Promise<void> {
    const token = await new SignJWT({ 
      sub: user.id, 
      role: user.role,
      name: user.name,
      email: user.email
    })
      .setProtectedHeader({ alg: JWT_ALG })
      .setIssuedAt()
      .setExpirationTime('7d')
      .sign(JWT_SECRET);

    const cookieStore = await cookies();
    cookieStore.set(SESSION_COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 1 semana
    });
  }

  static async getSession(): Promise<AuthUserDTO | null> {
    const cookieStore = await cookies();
    const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;

    if (!token) {
      return null;
    }

    try {
      const { payload } = await jwtVerify(token, JWT_SECRET, { algorithms: [JWT_ALG] });
      return {
        id: payload.sub as string,
        role: payload.role as AuthUserDTO['role'],
        name: payload.name as string,
        email: payload.email as string,
      };
    } catch {
      return null;
    }
  }

  static async destroySession(): Promise<void> {
    const cookieStore = await cookies();
    cookieStore.delete(SESSION_COOKIE_NAME);
  }
}