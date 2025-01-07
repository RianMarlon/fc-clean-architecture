import Notification from "../../@shared/notification/notification";
import NotificationError from "../../@shared/notification/notification.error";
import { AddressValidatorFactory } from "../factory/address.validator.factory";

export default class Address {
  _street: string = "";
  _number: number = 0;
  _zip: string = "";
  _city: string = "";
  notification: Notification;

  constructor(street: string, number: number, zip: string, city: string) {
    this._street = street;
    this._number = number;
    this._zip = zip;
    this._city = city;
    this.notification = new Notification();
    this.validate();
  }

  get street(): string {
    return this._street;
  }

  get number(): number {
    return this._number;
  }

  get zip(): string {
    return this._zip;
  }

  get city(): string {
    return this._city;
  }

  validate() {
    AddressValidatorFactory.create().validate(this);
    if (this.notification.hasErrors()) {
      throw new NotificationError(this.notification.getErrors());
    }
  }

  toString() {
    return `${this._street}, ${this._number}, ${this._zip} ${this._city}`;
  }
}
