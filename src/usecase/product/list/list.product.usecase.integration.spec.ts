import { Sequelize } from "sequelize-typescript";
import { v4 as uuid } from "uuid";
import { ListProductUseCase } from "./list.product.usecase";
import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import Product from "../../../domain/product/entity/product";
import { InputListProductDto } from "./list.product.dto";

describe("Integration test for list product use case", () => {
  let listProductUseCase: ListProductUseCase;
  let sequelize: Sequelize;
  let productRepository: ProductRepositoryInterface;
  let findAllProductRepositorySpyOn: jest.SpyInstance<Promise<Product[]>, []>;

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
    findAllProductRepositorySpyOn = jest.spyOn(productRepository, "findAll");
    listProductUseCase = new ListProductUseCase(productRepository);
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should return a list of products", async () => {
    const product1 = new Product(uuid(), "Product 1", 40);
    const product2 = new Product(uuid(), "Product 2", 140);
    await productRepository.create(product1);
    await productRepository.create(product2);

    const input: InputListProductDto = {};
    const result = await listProductUseCase.execute(input);

    expect(result.products.length).toEqual(2);
    expect(result.products[0].id).toEqual(product1.id);
    expect(result.products[0].name).toEqual(product1.name);
    expect(result.products[0].price).toEqual(product1.price);
    expect(result.products[1].id).toEqual(product2.id);
    expect(result.products[1].name).toEqual(product2.name);
    expect(result.products[1].price).toEqual(product2.price);
    expect(findAllProductRepositorySpyOn).toHaveBeenCalled();
  });
});
