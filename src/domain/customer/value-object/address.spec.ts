import Address from "./address";

describe("Address unit tests", () => {
  it("should create a address", () => {
    const address = new Address("Street", 100, "9381012", "City");
    expect(address.number).toEqual(100);
    expect(address.street).toEqual("Street");
    expect(address.zip).toEqual("9381012");
    expect(address.city).toEqual("City");
    expect(address.toString()).toEqual("Street, 100, 9381012 City");
  });

  it("should throw error if the number is empty", () => {
    expect(() => {
      const address = new Address("Street", null, "9381012", "City");
    }).toThrow("customer.address: Number is required");
  });

  it("should throw error if the street is empty", () => {
    expect(() => {
      const address = new Address("", 300, "9381012", "City");
    }).toThrow("customer.address: Street is required");
  });

  it("should throw error if the zip is empty", () => {
    expect(() => {
      const address = new Address("Street", 300, "", "City");
    }).toThrow("customer.address: Zip is required");
  });

  it("should throw error if the city is empty", () => {
    expect(() => {
      const address = new Address("Street", 300, "9381012", "");
    }).toThrow("customer.address: City is required");
  });

  it("should throw error if the street and city are empty", () => {
    expect(() => {
      const address = new Address("", 300, "9381012", "");
    }).toThrow(
      "customer.address: Street is required,customer.address: City is required"
    );
  });
});
