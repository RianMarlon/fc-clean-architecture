import { v4 as uuid } from "uuid";

import Product from "../../../domain/product/entity/product";
import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import { InputListProductDto } from "./list.product.dto";
import { ListProductUseCase } from "./list.product.usecase";

const productMock1 = new Product(uuid(), "Product 1", 30);
const productMock2 = new Product(uuid(), "Product 2", 80);

describe("Unit test for list product use case", () => {
  let listProductUseCase: ListProductUseCase;
  let productRepositoryMock: ProductRepositoryInterface;

  beforeAll(() => {
    productRepositoryMock = {
      findAll: jest.fn().mockResolvedValue([productMock1, productMock2]),
      find: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
    };
    listProductUseCase = new ListProductUseCase(productRepositoryMock);
  });

  it("should return a list of products", async () => {
    const input: InputListProductDto = {};
    const result = await listProductUseCase.execute(input);

    expect(result.products.length).toBe(2);
    expect(result.products[0].id).toBe(productMock1.id);
    expect(result.products[0].name).toBe(productMock1.name);
    expect(result.products[0].price).toBe(productMock1.price);
    expect(result.products[1].id).toBe(productMock2.id);
    expect(result.products[1].name).toBe(productMock2.name);
    expect(result.products[1].price).toBe(productMock2.price);
    expect(productRepositoryMock.findAll).toHaveBeenCalled();
  });
});
