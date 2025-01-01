import express, { Request, Response } from "express";
import CreateCustomerUseCase from "../../../usecase/customer/create/create.customer.usecase";
import CustomerRepository from "../../customer/repository/sequelize/customer.repository";
import ListCustomerUseCase from "../../../usecase/customer/list/list.customer.usecase";
import FindCustomerUseCase from "../../../usecase/customer/find/find.customer.usecase";
import UpdateCustomerUseCase from "../../../usecase/customer/update/update.customer.usecase";

export const customerRoute = express.Router();

customerRoute.get("/:id", async (req: Request, res: Response) => {
  const id = req.params.id;
  const usecase = new FindCustomerUseCase(new CustomerRepository());
  try {
    const output = await usecase.execute({
      id,
    });
    res.send(output);
  } catch (error) {
    res.status(500).send(error);
  }
});

customerRoute.get("/", async (req: Request, res: Response) => {
  const usecase = new ListCustomerUseCase(new CustomerRepository());
  try {
    const output = await usecase.execute({});
    res.send(output);
  } catch (error) {
    res.status(500).send(error);
  }
});

customerRoute.post("/", async (req: Request, res: Response) => {
  const usecase = new CreateCustomerUseCase(new CustomerRepository());
  try {
    const customerDto = {
      name: req.body.name,
      address: {
        street: req.body.address.street,
        city: req.body.address.city,
        number: req.body.address.number,
        zip: req.body.address.zip,
      },
    };
    const output = await usecase.execute(customerDto);
    res.send(output);
  } catch (error) {
    res.status(500).send(error);
  }
});

customerRoute.put("/:id", async (req: Request, res: Response) => {
  const id = req.params.id;
  const usecase = new UpdateCustomerUseCase(new CustomerRepository());
  try {
    const customerUpdateDto = {
      id,
      name: req.body.name,
      address: {
        street: req.body.address.street,
        city: req.body.address.city,
        number: req.body.address.number,
        zip: req.body.address.zip,
      },
    };
    const output = await usecase.execute(customerUpdateDto);
    res.send(output);
  } catch (error) {
    res.status(500).send(error);
  }
});
