import { IProductRepository } from "../../repositories/IProductRepository";
import { DomainError } from "../../../domain/exceptions/DomainError";

export class DeleteProductUseCase {
  constructor(private productRepository: IProductRepository) {}

  async execute(id: string): Promise<void> {
    const product = await this.productRepository.findById(id);
    if (!product) {
        throw new DomainError("Produto não encontrado.");
    }
    await this.productRepository.delete(id);
  }
}