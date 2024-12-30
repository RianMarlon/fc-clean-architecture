import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import {
  InputUpdateProductDto,
  OutputUpdateProductDto,
} from "./update.product.dto";

export class UpdateProductUseCase {
  constructor(private readonly productRepository: ProductRepositoryInterface) {}

  async execute(input: InputUpdateProductDto): Promise<OutputUpdateProductDto> {
    const productUpdated = await this.productRepository.find(input.id);
    productUpdated.changeName(input.name);
    productUpdated.changePrice(input.price);
    await this.productRepository.update(productUpdated);
    return {
      id: productUpdated.id,
      name: productUpdated.name,
      price: productUpdated.price,
    };
  }
}
