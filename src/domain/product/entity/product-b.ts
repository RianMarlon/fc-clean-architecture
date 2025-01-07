import Entity from "../../@shared/entity/entity.abstract";
import NotificationError from "../../@shared/notification/notification.error";
import { ProductValidatorFactory } from "../factory/product.validator.factory";
import ProductInterface from "./product.interface";

export default class ProductB extends Entity implements ProductInterface {
  private _name: string;
  private _price: number;

  constructor(id: string, name: string, price: number) {
    super();
    this._id = id;
    this._name = name;
    this._price = price;
    this.validate();
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  changeName(name: string): void {
    this._name = name;
    this.validate();
  }

  get price(): number {
    return this._price * 2;
  }

  changePrice(price: number): void {
    this._price = price;
    this.validate();
  }

  changeNameAndPrice(name: string, price: number) {
    this._name = name;
    this._price = price;
    this.validate();
  }

  validate() {
    ProductValidatorFactory.create().validate(this);

    if (this.notification.hasErrors()) {
      throw new NotificationError(this.notification.getErrors());
    }
  }
}
