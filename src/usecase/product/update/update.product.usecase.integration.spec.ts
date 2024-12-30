import { Sequelize } from "sequelize-typescript";
import Product from "../../../domain/product/entity/product";
import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import { UpdateProductUseCase } from "./update.product.usecase";
import { InputUpdateProductDto } from "./update.product.dto";

describe("Integration test for UpdateProductUseCase", () => {
  let updateProductUseCase: UpdateProductUseCase;
  let productRepository: ProductRepositoryInterface;
  let updateProductRepositorySpyOn: jest.SpyInstance<Promise<void>, [Product]>;
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: true,
      sync: { force: true },
    });
    sequelize.addModels([ProductModel]);
    await sequelize.sync();

    productRepository = new ProductRepository();
    updateProductRepositorySpyOn = jest.spyOn(productRepository, "update");
    updateProductUseCase = new UpdateProductUseCase(productRepository);
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should update a product", async () => {
    const productToCreate = new Product("123", "Product", 10);
    await productRepository.create(productToCreate);

    const input: InputUpdateProductDto = {
      id: "123",
      name: "Product 2",
      price: 20,
    };
    const productUpdated = await updateProductUseCase.execute(input);

    expect(productUpdated.id).toEqual(input.id);
    expect(productUpdated.name).toEqual(input.name);
    expect(productUpdated.price).toEqual(input.price);
    expect(updateProductRepositorySpyOn).toHaveBeenCalled();
  });

  it("should throw an error if the product is not found", async () => {
    const input: InputUpdateProductDto = {
      id: "abc",
      name: "Product 2",
      price: 20,
    };

    await expect(updateProductUseCase.execute(input)).rejects.toThrow(
      "Product not found"
    );
  });

  it("should throw an error if the name is missing", async () => {
    const productToCreate = new Product("123", "Product", 10);
    await productRepository.create(productToCreate);

    const input: InputUpdateProductDto = {
      id: "123",
      name: "",
      price: 60,
    };

    await expect(updateProductUseCase.execute(input)).rejects.toThrow(
      "Name is required"
    );
  });

  it("should throw an error if the price is lower than zero", async () => {
    const productToCreate = new Product("123", "Product", 10);
    await productRepository.create(productToCreate);

    const input: InputUpdateProductDto = {
      id: "123",
      name: "Teste",
      price: -2,
    };
    await expect(updateProductUseCase.execute(input)).rejects.toThrow(
      "Price must be greater or equal than zero"
    );
  });
});
