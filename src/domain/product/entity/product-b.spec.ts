import ProductB from "./product-b";

describe("ProductB unit tests", () => {
  it("should change name", () => {
    const product = new ProductB("123", "ProductB 1", 100);
    product.changeName("ProductB 2");
    expect(product.name).toEqual("ProductB 2");
  });

  it("should change price", () => {
    const product = new ProductB("123", "ProductB 1", 100);
    product.changePrice(80);
    expect(product.price).toEqual(160);
  });

  it("should change name and price", () => {
    const product = new ProductB("123", "ProductB 1", 100);
    product.changeNameAndPrice("ProductB 2", 50);
    expect(product.name).toEqual("ProductB 2");
    expect(product.price).toEqual(100);
  });

  it("should throw error when id is empty", () => {
    expect(() => {
      const product = new ProductB("", "ProductB 1", 100);
    }).toThrow("product: Id is required");
  });

  it("should throw error when name is empty", () => {
    expect(() => {
      const product = new ProductB("123", "", 100);
    }).toThrow("product: Name is required");
  });

  it("should throw error when price is less than zero", () => {
    expect(() => {
      const product = new ProductB("123", "Name", -1);
    }).toThrow("product: Price must be greater or equal than zero");
  });

  it("should throw error when id and name are empty", () => {
    expect(() => {
      const product = new ProductB("", "", 100);
    }).toThrow("product: Id is required,product: Name is required");
  });
});
