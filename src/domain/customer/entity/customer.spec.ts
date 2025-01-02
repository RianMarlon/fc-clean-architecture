import Address from "../value-object/address";
import Customer from "./customer";

describe("Customer unit tests", () => {
  it("should create an user", () => {
    const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
    const customer = Customer.create("123", "John", address);

    expect(customer.id).toEqual("123");
    expect(customer.name).toEqual("John");
    expect(customer.address).toEqual(address);
  });

  it("should throw error when id is empty", () => {
    expect(() => {
      const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
      let customer = Customer.create("", "John", address);
    }).toThrow("customer: Id is required");
  });

  it("should throw error when name is empty", () => {
    expect(() => {
      const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
      let customer = Customer.create("123", "", address);
    }).toThrow("customer: Name is required");
  });

  it("should throw error when address is empty", () => {
    expect(() => {
      let customer = Customer.create("123", "John", null);
    }).toThrow("customer: Address is required");
  });

  it("should throw error when id and name are empty", () => {
    expect(() => {
      let customer = Customer.create("123", "", null);
    }).toThrow("customer: Name is required,customer: Address is required");
  });

  it("should change name", () => {
    const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
    const customer = Customer.create("123", "John", address);
    customer.changeName("Jane");
    expect(customer.name).toBe("Jane");
  });

  it("should change address", () => {
    const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
    const customer = Customer.create("123", "John", address);
    const newAddress = new Address("Street 1", 123, "13330-250", "São Paulo");
    customer.changeAddress(newAddress);
  });

  it("should activate customer", () => {
    const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
    const customer = Customer.create("1", "Customer 1", address);
    customer.activate();

    expect(customer.isActive()).toBeTruthy();
  });

  it("should deactivate customer", () => {
    const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
    const customer = Customer.create("1", "Customer 1", address);

    customer.deactivate();

    expect(customer.isActive()).toBeFalsy();
  });

  it("should add reward points", () => {
    const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
    const customer = Customer.create("1", "Customer 1", address);
    expect(customer.rewardPoints).toBe(0);

    customer.addRewardPoints(10);
    expect(customer.rewardPoints).toBe(10);

    customer.addRewardPoints(10);
    expect(customer.rewardPoints).toBe(20);
  });
});
