import { Sequelize } from "sequelize-typescript";

import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import { FindProductUseCase } from "./find.product.usecase";
import Product from "../../../domain/product/entity/product";

import { InputFindProductDto } from "./find.product.dto";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";

describe("Integration test for find product use case", () => {
  let findProductUseCase: FindProductUseCase;
  let productRepository: ProductRepository;
  let findProductRepositorySpyOn: jest.SpyInstance<Promise<Product>, [string]>;
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([ProductModel]);
    await sequelize.sync();

    productRepository = new ProductRepository();
    findProductRepositorySpyOn = jest.spyOn(productRepository, "find");
    findProductUseCase = new FindProductUseCase(productRepository);
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should return a product", async () => {
    const productCreated = new Product("123", "Product", 300);
    await productRepository.create(productCreated);
    const input: InputFindProductDto = {
      id: "123",
    };
    const product = await findProductUseCase.execute(input);

    expect(product.id).toEqual(productCreated.id);
    expect(product.name).toEqual(productCreated.name);
    expect(product.price).toEqual(productCreated.price);
    expect(findProductRepositorySpyOn).toHaveBeenCalled();
    expect(productRepository.find).toHaveBeenCalled();
  });

  it("should throw an error if the product is not found", async () => {
    const input: InputFindProductDto = {
      id: "1234",
    };
    await expect(findProductUseCase.execute(input)).rejects.toThrow(
      "Product not found"
    );
    expect(productRepository.find).toHaveBeenCalled();
  });
});
