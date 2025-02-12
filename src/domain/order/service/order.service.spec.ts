import Address from "../../customer/value-object/address";
import Customer from "../../customer/entity/customer";
import Order from "../entity/order";
import OrderItem from "../entity/order-item";
import OrderService from "./order.service";

describe("Order service unit tests", () => {
  describe("placeOrder", () => {
    it("should place an order", () => {
      const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
      const customer = new Customer("c1", "Customer 1", address);
      const item1 = new OrderItem("i1", "Item 1", 10, "p1", 1);
      const order = OrderService.placeOrder(customer, [item1]);

      expect(customer.rewardPoints).toBe(5);
      expect(order.total()).toBe(10);
    });

    it("should throw error if the the order does not have items", async () => {
      const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
      const customer = new Customer("c1", "Customer 1", address);

      expect(() => {
        OrderService.placeOrder(customer, []);
      }).toThrow("Order must have at least one item");
    });
  });

  describe("total", () => {
    it("should get total of all orders", () => {
      const orderItem1 = new OrderItem("i1", "Item 1", 100, "p1", 1);
      const orderItem2 = new OrderItem("i2", "Item 2", 200, "p1", 2);

      const order = new Order("o1", "c1", [orderItem1]);
      const order2 = new Order("o2", "c2", [orderItem2]);

      const total = OrderService.total([order, order2]);

      expect(total).toEqual(500);
    });
  });
});
