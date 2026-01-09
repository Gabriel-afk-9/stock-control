'use server'

import { z } from 'zod'
import { PrismaClient } from '@prisma/client'
import { compare } from 'bcryptjs'
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'

const prisma = new PrismaClient()

const loginSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres"),
})

export async function loginAction(prevState: any, formData: FormData) {
  const result = loginSchema.safeParse(Object.fromEntries(formData))

  if (!result.success) {
    return { error: "Dados inválidos. Verifique e tente novamente." }
  }

  const { email, password } = result.data

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    })

    if (!user) {
      return { error: "Credenciais inválidas." }
    }

    const isPasswordValid = await compare(password, user.password)

    if (!isPasswordValid) {
      return { error: "Credenciais inválidas." }
    }

    (await cookies()).set('session_user', JSON.stringify({ id: user.id, role: user.role }), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24,
      path: '/',
    })

    if (user.role === 'ALMOXARIFE') {
      redirect('/dashboard')
    } else {
      redirect('/dashboard/requisitions') 
    }

  } catch (error) {
    if (error instanceof Error && error.message.includes('NEXT_REDIRECT')) {
        throw error;
    }
    return { error: "Erro interno no servidor." }
  }
}