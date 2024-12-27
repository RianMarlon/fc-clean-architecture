import Customer from "../../../domain/customer/entity/customer";
import Address from "../../../domain/customer/value-object/address";
import FindCustomerUseCase from "./find.customer.usecase";

const address = new Address("Street", 123, "Zip", "City");
const customer = new Customer("123", "John", address);

const MockRepository = () => {
  return {
    find: jest.fn().mockResolvedValue(customer),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };
};
describe("Unit Test find customer use case", () => {
  it("should find a customer", async () => {
    const customerRepository = MockRepository();
    const usecase = new FindCustomerUseCase(customerRepository);

    const input = {
      id: "123",
    };

    const result = await usecase.execute(input);
    const outputExpected = {
      id: "123",
      name: "John",
      address: {
        street: "Street",
        city: "City",
        number: 123,
        zip: "Zip",
      },
    };
    expect(result).toEqual(outputExpected);
  });

  it("should not find a customer", async () => {
    const customerRepository = MockRepository();
    customerRepository.find.mockImplementation(() => {
      throw new Error("Customer not found");
    });
    const usecase = new FindCustomerUseCase(customerRepository);

    const input = {
      id: "123",
    };

    expect(() => {
      return usecase.execute(input);
    }).rejects.toThrow("Customer not found");
  });
});
