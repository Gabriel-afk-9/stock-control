'use server'

import { DomainError } from '@/core/errors/DomainError';
import { revalidatePath } from 'next/cache';
import { makeDeleteProductUseCase } from '../../main/factories/makeDeleteProductUseCase';
import { makeCreateProductUseCase } from '../../main/factories/makeCreateProductUseCase';
import { z } from 'zod';
import { requireRole } from '@/features/auth/presentation/guards/auth.guards';

const deleteProductSchema = z.object({
  productId: z.string().uuid('ID do produto inválido'),
});

const createProductSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório').max(255),
  sku: z.string().min(1, 'SKU é obrigatório').max(100),
  quantity: z.number().int().min(0, 'Quantidade não pode ser negativa'),
  price: z.number().positive('Preço deve ser positivo'),
  minStock: z.number().int().min(0).optional(),
  maxStock: z.number().int().min(0).optional(),
});

export async function deleteProductAction(productId: string) {
  await requireRole(['ADMIN', 'ALMOXARIFE']);

  const validation = deleteProductSchema.safeParse({ productId });
  if (!validation.success) {
    return { success: false, message: validation.error.issues[0].message };
  }

  try {
    const useCase = makeDeleteProductUseCase();
    await useCase.execute(validation.data);
    
    revalidatePath('/dashboard/inventory');
    return { success: true };
  } catch (error) {
    if (error instanceof DomainError) {
      return { success: false, message: error.message };
    }
    return { success: false, message: 'Erro interno ao deletar produto.' };
  }
}

export async function createProductAction(formData: FormData) {
  await requireRole(['ADMIN', 'ALMOXARIFE']);

  const rawData = {
    name: formData.get('name') as string,
    sku: formData.get('sku') as string,
    quantity: parseInt(formData.get('quantity') as string, 10),
    price: parseFloat(formData.get('price') as string),
    minStock: formData.get('minStock') ? parseInt(formData.get('minStock') as string, 10) : undefined,
    maxStock: formData.get('maxStock') ? parseInt(formData.get('maxStock') as string, 10) : undefined,
  };

  const validation = createProductSchema.safeParse(rawData);
  if (!validation.success) {
    return { success: false, message: validation.error.issues[0].message };
  }

  try {
    const useCase = makeCreateProductUseCase();
    await useCase.execute(validation.data);
    revalidatePath('/dashboard/inventory');
    return { success: true };
  } catch (error) {
    if (error instanceof DomainError) {
      return { success: false, message: error.message };
    }
    if (error instanceof Error) {
      return { success: false, message: error.message };
    }
    return { success: false, message: 'Erro interno ao criar produto.' };
  }
}