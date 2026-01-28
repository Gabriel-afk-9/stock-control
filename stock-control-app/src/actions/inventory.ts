'use server'

import { cookies } from 'next/headers'
import { prisma } from '../lib/prisma'
import { revalidatePath } from 'next/cache'

export async function deleteProduct(productId: string) {
    const sessionCookie = (await cookies()).get('session_user')
    
    if (!sessionCookie) throw new Error('Não Autorizado')
    
    const user = JSON.parse(sessionCookie.value)

    if (user.role !== 'ALMOXARIFE') {
        return {error: "Apenas Almoxarife pode deletar itens."}
    }

    try {
        await prisma.product.delete({where: { id: productId }})
        revalidatePath('/dashboard/inventory/')
        return { success: true }
    } catch (e) { 
        return { error: "Erro ao deletar produto"}
    }
}
