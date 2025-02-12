import { app, sequelize } from "../express";
import request from "supertest";

describe("E2E test for customer", () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  describe("[GET] /customer", () => {
    it("should return all customers", async () => {
      await request(app)
        .post("/customer")
        .send({
          name: "John",
          address: {
            street: "Street",
            city: "City",
            number: 123,
            zip: "12345",
          },
        });
      await request(app)
        .post("/customer")
        .send({
          name: "Jane",
          address: {
            street: "Street 2",
            city: "City 2",
            number: 1234,
            zip: "12344",
          },
        });

      const listCustomersResponse = await request(app).get("/customer").send();
      expect(listCustomersResponse.status).toBe(200);
      expect(listCustomersResponse.body.customers.length).toBe(2);
      const customers = listCustomersResponse.body.customers;
      expect(customers[0].name).toBe("John");
      expect(customers[0].address.street).toBe("Street");
      expect(customers[0].address.city).toBe("City");
      expect(customers[0].address.number).toBe(123);
      expect(customers[0].address.zip).toBe("12345");

      expect(customers[1].name).toBe("Jane");
      expect(customers[1].address.street).toBe("Street 2");
      expect(customers[1].address.city).toBe("City 2");
      expect(customers[1].address.number).toBe(1234);
      expect(customers[1].address.zip).toBe("12344");

      const listCustomersResponseXML = await request(app)
        .get("/customer")
        .set("Accept", "application/xml")
        .send();

      expect(listCustomersResponseXML.status).toBe(200);
      expect(listCustomersResponseXML.text).toContain(
        '<?xml version="1.0" encoding="UTF-8"'
      );
      expect(listCustomersResponseXML.text).toContain("<customers>");
      expect(listCustomersResponseXML.text).toContain("<customer>");
      expect(listCustomersResponseXML.text).toContain("<name>John</name>");
      expect(listCustomersResponseXML.text).toContain("<address>");
      expect(listCustomersResponseXML.text).toContain(
        "<street>Street</street>"
      );
      expect(listCustomersResponseXML.text).toContain("<city>City</city>");
      expect(listCustomersResponseXML.text).toContain("<number>123</number>");
      expect(listCustomersResponseXML.text).toContain("<zip>12345</zip>");
      expect(listCustomersResponseXML.text).toContain("</address>");
      expect(listCustomersResponseXML.text).toContain("</customer>");
    });
  });

  describe("[GET] /customer/:id", () => {
    it("should return a customer by id", async () => {
      const createCustomerResponse = await request(app)
        .post("/customer")
        .send({
          name: "John",
          address: {
            street: "Street",
            city: "City",
            number: 123,
            zip: "12345",
          },
        });
      const customerCreated = createCustomerResponse.body;

      const findCustomerResponse = await request(app)
        .get(`/customer/${customerCreated.id}`)
        .send();
      expect(findCustomerResponse.status).toBe(200);

      const customerById = findCustomerResponse.body;
      expect(customerById.name).toBe("John");
      expect(customerById.address.street).toBe("Street");
      expect(customerById.address.city).toBe("City");
      expect(customerById.address.number).toBe(123);
      expect(customerById.address.zip).toBe("12345");

      const findCustomerResponseXML = await request(app)
        .get(`/customer/${customerCreated.id}`)
        .set("Accept", "application/xml")
        .send();

      expect(findCustomerResponseXML.status).toBe(200);
      expect(findCustomerResponseXML.text).toContain(
        '<?xml version="1.0" encoding="UTF-8"'
      );
      expect(findCustomerResponseXML.text).toContain("<customer>");
      expect(findCustomerResponseXML.text).toContain("<name>John</name>");
      expect(findCustomerResponseXML.text).toContain("<address>");
      expect(findCustomerResponseXML.text).toContain("<street>Street</street>");
      expect(findCustomerResponseXML.text).toContain("<city>City</city>");
      expect(findCustomerResponseXML.text).toContain("<number>123</number>");
      expect(findCustomerResponseXML.text).toContain("<zip>12345</zip>");
      expect(findCustomerResponseXML.text).toContain("</address>");
      expect(findCustomerResponseXML.text).toContain("</customer>");
    });

    it("should return status code 500 when the customer is not found", async () => {
      const response = await request(app).get("/customer/123").send();
      expect(response.status).toBe(500);
    });
  });

  describe("[POST] /customer", () => {
    it("should create a customer", async () => {
      const createCustomerResponse = await request(app)
        .post("/customer")
        .send({
          name: "John",
          address: {
            street: "Street",
            city: "City",
            number: 123,
            zip: "12345",
          },
        });

      expect(createCustomerResponse.status).toBe(200);
      expect(createCustomerResponse.body.name).toBe("John");
      expect(createCustomerResponse.body.address.street).toBe("Street");
      expect(createCustomerResponse.body.address.city).toBe("City");
      expect(createCustomerResponse.body.address.number).toBe(123);
      expect(createCustomerResponse.body.address.zip).toBe("12345");

      const createCustomerResponseXML = await request(app)
        .post("/customer")
        .set("Accept", "application/xml")
        .send({
          name: "John",
          address: {
            street: "Street",
            city: "City",
            number: 123,
            zip: "12345",
          },
        });

      expect(createCustomerResponseXML.text).toContain("<customer>");
      expect(createCustomerResponseXML.text).toContain("<name>John</name>");
      expect(createCustomerResponseXML.text).toContain("<address>");
      expect(createCustomerResponseXML.text).toContain(
        "<street>Street</street>"
      );
      expect(createCustomerResponseXML.text).toContain("<city>City</city>");
      expect(createCustomerResponseXML.text).toContain("<number>123</number>");
      expect(createCustomerResponseXML.text).toContain("<zip>12345</zip>");
      expect(createCustomerResponseXML.text).toContain("</address>");
      expect(createCustomerResponseXML.text).toContain("</customer>");
    });

    it("should return status code 500 when the customer is not created", async () => {
      const createCustomerResponse = await request(app).post("/customer").send({
        name: "John",
      });
      expect(createCustomerResponse.status).toBe(500);
    });
  });

  describe("[PUT] /customer/:id", () => {
    it("should update a customer", async () => {
      const createCustomerResponse = await request(app)
        .post("/customer")
        .send({
          name: "John",
          address: {
            street: "Street",
            city: "City",
            number: 123,
            zip: "12345",
          },
        });
      const customer = createCustomerResponse.body;

      const updateCustomerResponse = await request(app)
        .put(`/customer/${customer.id}`)
        .send({
          name: "Jane 2",
          address: {
            street: "Street 2",
            city: "City 2",
            number: 1234,
            zip: "12344",
          },
        });
      expect(updateCustomerResponse.status).toBe(200);

      const customerUpdated = updateCustomerResponse.body;
      expect(customerUpdated.id).toBe(customer.id);
      expect(customerUpdated.name).toBe("Jane 2");
      expect(customerUpdated.address.street).toBe("Street 2");
      expect(customerUpdated.address.city).toBe("City 2");
      expect(customerUpdated.address.number).toBe(1234);
      expect(customerUpdated.address.zip).toBe("12344");

      const updateCustomerResponseXML = await request(app)
        .put(`/customer/${customer.id}`)
        .set("Accept", "application/xml")
        .send({
          name: "Jane 3",
          address: {
            street: "Street 3",
            city: "City 3",
            number: 12356,
            zip: "12345",
          },
        });

      expect(updateCustomerResponseXML.text).toContain("<customer>");
      expect(updateCustomerResponseXML.text).toContain("<name>Jane 3</name>");
      expect(updateCustomerResponseXML.text).toContain("<address>");
      expect(updateCustomerResponseXML.text).toContain(
        "<street>Street 3</street>"
      );
      expect(updateCustomerResponseXML.text).toContain("<city>City 3</city>");
      expect(updateCustomerResponseXML.text).toContain(
        "<number>12356</number>"
      );
      expect(updateCustomerResponseXML.text).toContain("<zip>12345</zip>");
      expect(updateCustomerResponseXML.text).toContain("</address>");
      expect(updateCustomerResponseXML.text).toContain("</customer>");
    });

    it("should not update a customer", async () => {
      const updateCustomerResponse = await request(app)
        .put(`/customer/123`)
        .send({
          name: "Jane 2",
          address: {
            street: "Street 2",
            city: "City 2",
            number: 1234,
            zip: "12344",
          },
        });
      expect(updateCustomerResponse.status).toBe(500);
    });
  });
});
