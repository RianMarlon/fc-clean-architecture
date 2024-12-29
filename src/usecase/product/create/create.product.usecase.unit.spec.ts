import { InputCreateProductDto } from "./create.product.dto";
import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import { CreateProductUseCase } from "./create.product.usecase";

describe("Unit test for create product usecase", () => {
  let createProductUseCase: CreateProductUseCase;
  let productRepositoryMock: ProductRepositoryInterface;

  beforeAll(() => {
    productRepositoryMock = {
      findAll: jest.fn(),
      find: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
    };
    createProductUseCase = new CreateProductUseCase(productRepositoryMock);
  });

  it("should create a product", async () => {
    const input: InputCreateProductDto = {
      name: "Teste",
      price: 10,
    };
    const result = await createProductUseCase.execute(input);

    expect(result.name).toEqual(input.name);
    expect(result.price).toEqual(input.price);
    expect(productRepositoryMock.create).toHaveBeenCalled();
  });

  it("should throw an error if the name is missing", async () => {
    const input: InputCreateProductDto = {
      name: "",
      price: 20,
    };

    await expect(createProductUseCase.execute(input)).rejects.toThrow(
      "Name is required"
    );
    expect(productRepositoryMock.create).not.toHaveBeenCalled();
  });

  it("should thrown an error if the price is lower than 0", async () => {
    const input: InputCreateProductDto = {
      name: "Teste",
      price: -1,
    };

    await expect(createProductUseCase.execute(input)).rejects.toThrow(
      "Price must be greater or equal than zero"
    );
    expect(productRepositoryMock.create).not.toHaveBeenCalled();
  });
});
