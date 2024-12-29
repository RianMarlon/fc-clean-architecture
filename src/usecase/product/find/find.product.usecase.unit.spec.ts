import Product from "../../../domain/product/entity/product";
import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import { InputFindProductDto } from "./find.product.dto";
import { FindProductUseCase } from "./find.product.usecase";

const productMock = new Product("123", "Product", 50);

describe("Unit test for find product use case", () => {
  let findProductUseCase: FindProductUseCase;
  let productRepositoryMock: ProductRepositoryInterface;

  beforeAll(() => {
    productRepositoryMock = {
      findAll: jest.fn(),
      find: jest.fn().mockResolvedValue(productMock),
      create: jest.fn(),
      update: jest.fn(),
    };
    findProductUseCase = new FindProductUseCase(productRepositoryMock);
  });

  it("should return a product", async () => {
    const input: InputFindProductDto = {
      id: "123",
    };
    const result = await findProductUseCase.execute(input);
    expect(result.id).toEqual(productMock.id);
    expect(result.name).toEqual(productMock.name);
    expect(result.price).toEqual(productMock.price);
    expect(productRepositoryMock.find).toHaveBeenCalled();
  });

  it("should throw an error if the product is not found", async () => {
    jest.spyOn(productRepositoryMock, "find").mockResolvedValueOnce(null);
    const input: InputFindProductDto = {
      id: "abc",
    };
    await expect(findProductUseCase.execute(input)).rejects.toThrow(
      "Product not found"
    );
    expect(productRepositoryMock.find).toHaveBeenCalled();
  });
});
