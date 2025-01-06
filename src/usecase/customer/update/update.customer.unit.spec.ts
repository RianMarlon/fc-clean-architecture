import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import Address from "../../../domain/customer/value-object/address";
import { InputUpdateCustomerDto } from "./update.customer.dto";
import UpdateCustomerUseCase from "./update.customer.usecase";

const customer = CustomerFactory.create(
  "John",
  new Address("Street", 123, "Zip", "City")
);

const input = {
  id: customer.id,
  name: "John Updated",
  address: {
    street: "Street Updated",
    number: 1234,
    zip: "Zip Updated",
    city: "City Updated",
  },
};

const MockRepository = () => {
  return {
    create: jest.fn(),
    findAll: jest.fn(),
    find: jest.fn().mockResolvedValue(customer),
    update: jest.fn(),
  };
};

describe("Unit test for customer update use case", () => {
  it("should update a customer", async () => {
    const customerRepository = MockRepository();
    const customerUpdateUseCase = new UpdateCustomerUseCase(customerRepository);

    const output = await customerUpdateUseCase.execute(input);

    expect(output).toEqual(input);
  });

  it("should throw an error if the customer is not found", async () => {
    const customerRepository = MockRepository();
    jest.spyOn(customerRepository, "find").mockImplementationOnce(() => {
      throw new Error("Customer not found");
    });
    const customerUpdateUseCase = new UpdateCustomerUseCase(customerRepository);

    await expect(customerUpdateUseCase.execute(input)).rejects.toThrow(
      "Customer not found"
    );
  });

  it("should throw an error if the name is empty", async () => {
    const customerRepository = MockRepository();
    const customerUpdateUseCase = new UpdateCustomerUseCase(customerRepository);

    const input: InputUpdateCustomerDto = {
      id: customer.id,
      name: "",
      address: {
        street: "Street Updated",
        number: 1234,
        zip: "Zip Updated",
        city: "City Updated",
      },
    };
    await expect(customerUpdateUseCase.execute(input)).rejects.toThrow(
      "customer: Name is required"
    );
  });

  it("should throw an error if the address is empty", async () => {
    const customerRepository = MockRepository();
    const customerUpdateUseCase = new UpdateCustomerUseCase(customerRepository);

    const input: InputUpdateCustomerDto = {
      id: customer.id,
      name: "Customer",
      address: null,
    };
    await expect(customerUpdateUseCase.execute(input)).rejects.toThrow(
      "customer: Address is required"
    );
  });

  it("should throw an error if the name and address are empty", async () => {
    const customerRepository = MockRepository();
    const customerUpdateUseCase = new UpdateCustomerUseCase(customerRepository);

    const input: InputUpdateCustomerDto = {
      id: customer.id,
      name: "",
      address: null,
    };
    await expect(customerUpdateUseCase.execute(input)).rejects.toThrow(
      "customer: Name is required,customer: Address is required"
    );
  });
});
