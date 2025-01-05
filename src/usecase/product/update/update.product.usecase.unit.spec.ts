import Product from "../../../domain/product/entity/product";
import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import { InputUpdateProductDto } from "./update.product.dto";
import { UpdateProductUseCase } from "./update.product.usecase";

describe("Unit test for update product use case", () => {
  let updateProductUseCase: UpdateProductUseCase;
  let productRepositoryMock: ProductRepositoryInterface;

  beforeEach(() => {
    productRepositoryMock = {
      findAll: jest.fn(),
      find: jest.fn().mockResolvedValue(new Product("123", "Product", 43)),
      create: jest.fn(),
      update: jest.fn(),
    };
    updateProductUseCase = new UpdateProductUseCase(productRepositoryMock);
  });

  it("should update a product", async () => {
    const input: InputUpdateProductDto = {
      id: "123",
      name: "Product updated",
      price: 930,
    };
    const result = await updateProductUseCase.execute(input);

    expect(result.id).toEqual(input.id);
    expect(result.name).toEqual(input.name);
    expect(result.price).toEqual(input.price);
    expect(productRepositoryMock.find).toHaveBeenCalled();
    expect(productRepositoryMock.update).toHaveBeenCalled();
  });

  it("should throw an error if the product is not found", async () => {
    jest.spyOn(productRepositoryMock, "find").mockImplementationOnce(() => {
      throw new Error("Product not found");
    });
    const input: InputUpdateProductDto = {
      id: "324",
      name: "Produc updated",
      price: 932,
    };

    await expect(updateProductUseCase.execute(input)).rejects.toThrow(
      "Product not found"
    );
  });

  it("should throw an error if the name is missing", async () => {
    const input: InputUpdateProductDto = {
      id: "324",
      name: "",
      price: 932,
    };

    await expect(updateProductUseCase.execute(input)).rejects.toThrow(
      "product: Name is required"
    );
  });

  it("should throw an error if the price is lower than zero", async () => {
    const input: InputUpdateProductDto = {
      id: "324",
      name: "Product updated",
      price: -9,
    };

    await expect(updateProductUseCase.execute(input)).rejects.toThrow(
      "product: Price must be greater or equal than zero"
    );
  });

  it("should throw an error if the name is empty and the price is lower than zero", async () => {
    const input: InputUpdateProductDto = {
      id: "324",
      name: "",
      price: -9,
    };

    await expect(updateProductUseCase.execute(input)).rejects.toThrow(
      "product: Name is required,product: Price must be greater or equal than zero"
    );
  });
});
