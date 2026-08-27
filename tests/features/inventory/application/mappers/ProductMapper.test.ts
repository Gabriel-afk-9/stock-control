import { describe, it, expect } from 'vitest';
import { Product } from '@/features/inventory/domain/entities/Product';
import { ProductMapper } from '@/features/inventory/application/mappers/ProductMapper';

function makeProduct() {
  return new Product({
    id: 'p1',
    name: 'Parafuso',
    sku: 'SKU-1',
    quantity: 5,
    price: 2.5,
    minStock: 10,
  });
}

describe('ProductMapper', () => {
  it('toDTO mapeia campos e formata preço em BRL', () => {
    const dto = ProductMapper.toDTO(makeProduct());

    expect(dto.id).toBe('p1');
    expect(dto.name).toBe('Parafuso');
    expect(dto.sku).toBe('SKU-1');
    expect(dto.quantity).toBe(5);
    expect(dto.price).toBe(2.5);
    expect(dto.minStock).toBe(10);
    expect(dto.status).toBe('LOW_STOCK');
    expect(dto.formattedPrice).toMatch(/R\$\s?2,50/);
  });

  it('toDTOList mapeia todos os itens', () => {
    const list = [makeProduct(), makeProduct()];
    const dtos = ProductMapper.toDTOList(list);

    expect(dtos).toHaveLength(2);
    expect(dtos[0]).toHaveProperty('sku', 'SKU-1');
  });
});
