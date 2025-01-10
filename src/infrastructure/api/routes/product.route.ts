import express, { Request, Response } from "express";
import { ListProductUseCase } from "../../../usecase/product/list/list.product.usecase";
import ProductRepository from "../../product/repository/sequelize/product.repository";
import { FindProductUseCase } from "../../../usecase/product/find/find.product.usecase";
import { CreateProductUseCase } from "../../../usecase/product/create/create.product.usecase";
import { UpdateProductUseCase } from "../../../usecase/product/update/update.product.usecase";
import { ListProductPresenter } from "../presenters/products/list.product.presenter";
import { FindProductPresenter } from "../presenters/products/find.product.presenter";
import { CreateProductPresenter } from "../presenters/products/create.product.presenter";
import { UpdateProductPresenter } from "../presenters/products/update.product.presenter";

export const productRouter = express.Router();

productRouter.get("/", async (req: Request, res: Response) => {
  const usecase = new ListProductUseCase(new ProductRepository());
  try {
    const output = await usecase.execute({});
    res.format({
      json: async () => res.send(output),
      xml: async () => res.send(ListProductPresenter.toXML(output)),
    });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

productRouter.get("/:id", async (req: Request, res: Response) => {
  const id = req.params.id;
  const usecase = new FindProductUseCase(new ProductRepository());
  try {
    const output = await usecase.execute({
      id,
    });
    res.format({
      json: async () => res.send(output),
      xml: async () => res.send(FindProductPresenter.toXML(output)),
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

productRouter.post("/", async (req: Request, res: Response) => {
  const usecase = new CreateProductUseCase(new ProductRepository());
  try {
    const createProductDto = {
      name: req.body.name,
      price: req.body.price,
    };
    const output = await usecase.execute(createProductDto);
    res.format({
      json: async () => res.send(output),
      xml: async () => res.send(CreateProductPresenter.toXML(output)),
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

productRouter.put("/:id", async (req: Request, res: Response) => {
  const id = req.params.id;
  const usecase = new UpdateProductUseCase(new ProductRepository());
  try {
    const updateCustomerDto = {
      id,
      name: req.body.name,
      price: req.body.price,
    };
    const output = await usecase.execute(updateCustomerDto);
    res.format({
      json: async () => res.send(output),
      xml: async () => res.send(UpdateProductPresenter.toXML(output)),
    });
  } catch (error) {
    res.status(500).send(error);
  }
});
