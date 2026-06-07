'use server'

import { revalidatePath } from 'next/cache';
import { PrismaProductRepository } from '../../infrastructure/database/repositories/PrismaProductRepository';
import { DeleteProductUseCase } from '../../application/usecases/inventory/DeleteProductUseCase';
import { getAuthSession } from '../../infrastructure/auth/session';
import { handleActionError } from '../../lib/errorHandler';

const makeDeleteProductUseCase = () => {
  const repository = new PrismaProductRepository();
  return new DeleteProductUseCase(repository);
};

export async function deleteProductAction(productId: string) {
  const session = await getAuthSession();

  if (!session || session.role !== 'ALMOXARIFE') {
    return { error: "Apenas Almoxarife pode deletar itens." };
  }

  try {
    const useCase = makeDeleteProductUseCase();
    await useCase.execute(productId);

    revalidatePath('/dashboard/inventory');
    return { success: true };
  } catch (error: unknown) {
    // Substitui a lógica manual pelo handler
    return handleActionError(error);
  }
}