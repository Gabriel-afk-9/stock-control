'use server'

import { DomainError } from '@/core/errors/DomainError';
import { revalidatePath } from 'next/cache';
import { makeDeleteProductUseCase } from '../../main/factories/makeDeleteProductUseCase';

export async function deleteProductAction(productId: string) {
  try {
    const useCase = makeDeleteProductUseCase();
    await useCase.execute(productId);
    
    revalidatePath('/dashboard/inventory');
    return { success: true };
  } catch (error) {
    if (error instanceof DomainError) {
      return { success: false, message: error instanceof Error ? error.message : 'Erro interno.' };
    }
    return { success: false, message: 'Erro interno ao deletar produto.' };
  }
}