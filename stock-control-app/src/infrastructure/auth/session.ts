import { cookies } from 'next/headers';

interface SessionUser {
  id: string;
  role: string;
  name: string;
}

export async function setAuthSession(user: SessionUser) {
  const cookieStore = await cookies();
  cookieStore.set('session_user', JSON.stringify(user), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24,
    path: '/',
    sameSite: 'lax'
  });
}

export async function getAuthSession(): Promise<SessionUser | null> {
  const sessionCookie = (await cookies()).get('session_user');
  if (!sessionCookie) return null;
  try {
    return JSON.parse(sessionCookie.value) as SessionUser;
  } catch {
    return null;
  }
}

export async function destroyAuthSession() {
  (await cookies()).delete('session_user');
}