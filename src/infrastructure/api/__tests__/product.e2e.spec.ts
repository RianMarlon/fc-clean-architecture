import { app, sequelize } from "../express";
import request from "supertest";

describe("E2E test for product", () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  describe("[GET] /product", () => {
    it("should return all products", async () => {
      await request(app).post("/product").send({
        name: "Product 1",
        price: 55,
      });
      await request(app).post("/product").send({
        name: "Product 2",
        price: 40,
      });

      const listProductResponse = await request(app).get("/product").send();
      expect(listProductResponse.status).toBe(200);
      expect(listProductResponse.body.products.length).toBe(2);

      const products = listProductResponse.body.products;
      expect(products[0].name).toBe("Product 1");
      expect(products[0].price).toBe(55);
      expect(products[1].name).toBe("Product 2");
      expect(products[1].price).toBe(40);

      const listProductResponseXML = await request(app)
        .get("/product")
        .set("Accept", "application/xml")
        .send();
      expect(listProductResponseXML.status).toBe(200);
      expect(listProductResponseXML.text).toContain("<products>");
      expect(listProductResponseXML.text).toContain("<product>");
      expect(listProductResponseXML.text).toContain("<name>Product 1</name>");
      expect(listProductResponseXML.text).toContain("<price>55</price>");
      expect(listProductResponseXML.text).toContain("</product>");
      expect(listProductResponseXML.text).toContain("<product>");
      expect(listProductResponseXML.text).toContain("<name>Product 2</name>");
      expect(listProductResponseXML.text).toContain("<price>40</price>");
      expect(listProductResponseXML.text).toContain("</product>");
      expect(listProductResponseXML.text).toContain("</products>");
    });
  });

  describe("[GET] /product/:id", () => {
    it("should return a product by id", async () => {
      const createProductResponse = await request(app).post("/product").send({
        name: "Product 1",
        price: 10,
      });
      const productCreated = createProductResponse.body;
      const findProductResponse = await request(app)
        .get(`/product/${productCreated.id}`)
        .send();
      expect(findProductResponse.status).toBe(200);

      const productById = findProductResponse.body;
      expect(productById.id).toBe(productCreated.id);
      expect(productById.name).toBe("Product 1");
      expect(productById.price).toBe(10);

      const findProductResponseXML = await request(app)
        .get(`/product/${productCreated.id}`)
        .set("Accept", "application/xml")
        .send();
      expect(findProductResponseXML.status).toBe(200);

      expect(findProductResponseXML.text).toContain("<product>");
      expect(findProductResponseXML.text).toContain(
        `<id>${productCreated.id}</id>`
      );
      expect(findProductResponseXML.text).toContain("<name>Product 1</name>");
      expect(findProductResponseXML.text).toContain("<price>10</price>");
      expect(findProductResponseXML.text).toContain("</product>");
    });

    it("should return status code 500 when the product is not found", async () => {
      const findProductResponse = await request(app).get("/product/123").send();
      expect(findProductResponse.status).toBe(500);
    });
  });

  describe("[POST] /product", () => {
    it("should create a product", async () => {
      const createProductResponse = await request(app).post("/product").send({
        name: "Product",
        price: 10,
      });
      expect(createProductResponse.status).toBe(200);

      const productCreated = createProductResponse.body;
      expect(productCreated.name).toBe("Product");
      expect(productCreated.price).toBe(10);

      const createProductResponseXML = await request(app)
        .post("/product")
        .set("Accept", "application/xml")
        .send({
          name: "Product 2",
          price: 35,
        });
      expect(createProductResponseXML.status).toBe(200);

      expect(createProductResponseXML.text).toContain("<product>");
      expect(createProductResponseXML.text).toContain("<name>Product 2</name>");
      expect(createProductResponseXML.text).toContain("<price>35</price>");
      expect(createProductResponseXML.text).toContain("<product>");
    });

    it("should return status code 500 when the product created", async () => {
      const createProductResponse = await request(app).post("/product").send({
        name: "",
        price: 10,
      });
      expect(createProductResponse.status).toBe(500);
    });
  });

  describe("[PUT] /product/:id", () => {
    it("should update a product", async () => {
      const createProductResponse = await request(app).post("/product").send({
        name: "Product 1",
        price: 20,
      });
      const productCreated = createProductResponse.body;

      const updateProductResponse = await request(app)
        .put(`/product/${productCreated.id}`)
        .send({
          name: "Product 2",
          price: 110,
        });
      expect(updateProductResponse.status).toBe(200);

      const productUpdated = updateProductResponse.body;
      expect(productUpdated.id).toBe(productCreated.id);
      expect(productUpdated.name).toBe("Product 2");
      expect(productUpdated.price).toBe(110);

      const updateProductResponseXML = await request(app)
        .put(`/product/${productCreated.id}`)
        .set("Accept", "application/xml")
        .send({
          name: "Product 3",
          price: 140,
        });
      expect(updateProductResponseXML.status).toBe(200);

      expect(updateProductResponseXML.text).toContain("<product>");
      expect(updateProductResponseXML.text).toContain("<name>Product 3</name>");
      expect(updateProductResponseXML.text).toContain("<price>140</price>");
      expect(updateProductResponseXML.text).toContain("<product>");
    });

    it("should return status code 500 when the product is not updated", async () => {
      const updateProductResponse = await request(app)
        .put("/product/abc")
        .send({
          name: "Product 2",
          price: 110,
        });
      expect(updateProductResponse.status).toBe(500);
    });
  });
});
