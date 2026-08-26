import { Product } from '../../domain/entities/Product';
import { ProductDTO } from '../dtos/ProductDTO';

export class ProductMapper {
  static toDTO(product: Product): ProductDTO {
    return {
      id: product.id!,
      name: product.name,
      sku: product.sku,
      quantity: product.quantity,
      price: product.price,
      status: product.status,
      formattedPrice: new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }).format(product.price),
    };
  }

  static toDTOList(products: Product[]): ProductDTO[] {
    return products.map(ProductMapper.toDTO);
  }
}