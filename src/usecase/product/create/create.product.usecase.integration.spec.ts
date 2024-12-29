import { Sequelize } from "sequelize-typescript";
import { CreateProductUseCase } from "./create.product.usecase";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import { InputCreateProductDto } from "./create.product.dto";
import Product from "../../../domain/product/entity/product";

describe("Integration test for create product use case", () => {
  let createProductUseCase: CreateProductUseCase;
  let createProductRepositorySpyOn: jest.SpyInstance<Promise<void>, [Product]>;
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

    const productRepository = new ProductRepository();
    createProductRepositorySpyOn = jest.spyOn(productRepository, "create");
    createProductUseCase = new CreateProductUseCase(productRepository);
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a product", async () => {
    const input: InputCreateProductDto = {
      name: "Test",
      price: 20,
    };
    const result = await createProductUseCase.execute(input);

    expect(result.name).toEqual(input.name);
    expect(result.price).toEqual(input.price);
    expect(createProductRepositorySpyOn).toHaveBeenCalled();
  });

  it("should throw an error if the name is missing", async () => {
    const input: InputCreateProductDto = {
      name: "",
      price: 20,
    };

    await expect(createProductUseCase.execute(input)).rejects.toThrow(
      "Name is required"
    );
    expect(createProductRepositorySpyOn).not.toHaveBeenCalled();
  });

  it("should throw an error if the price is less than zero", async () => {
    const input: InputCreateProductDto = {
      name: "Teste",
      price: -1,
    };

    await expect(createProductUseCase.execute(input)).rejects.toThrow(
      "Price must be greater or equal than zero"
    );
    expect(createProductRepositorySpyOn).not.toHaveBeenCalled();
  });
});
