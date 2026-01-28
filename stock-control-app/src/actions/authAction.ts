'use server'

import { z } from 'zod'
import { prisma } from '../lib/prisma'
import { compare } from 'bcryptjs'
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'

const loginSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(1, "A senha é obrigatória"),
})

export async function loginAction(prevState: any, formData: FormData) {
  const data = Object.fromEntries(formData)
  const result = loginSchema.safeParse(data)

  if (!result.success) {
    return { error: result.error.issues[0].message }
  }

  const { email, password } = result.data

  try {
    const user = await prisma.user.findUnique({
      where: { email } })

    if (!user || !(await compare(password, user.password))) {
      return { error: "E-mail ou senha incorretos" }
    }
    
    const cookieStore = await cookies()
    cookieStore.set('session_user', JSON.stringify({ 
      id: user.id, 
      role: user.role, 
      name: user.name 
    }), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24,
      path: '/',
      sameSite: 'lax'
    })

    const destination = user.role === 'ALMOXARIFE'
    ? '/dashboard/inventory'
    : '/dashboard/requisitions'

    return redirect(destination)
    
  } catch (error: any) {
    if (error?.digest?.includes('NEXT_REDIRECT')) {
      throw error
    }
    
    console.error("Erro no Login:", error)
    return { error: "Ocorreu um erro inesperado. Tente novamente mais tarde." }
  }
}
//Usar no botão "Logout" no Sidebar
export async function logoutAction() {
  (await cookies()).delete('session_user')
  redirect('/login')
}
