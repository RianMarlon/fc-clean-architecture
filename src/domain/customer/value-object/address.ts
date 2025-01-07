import Notification from "../../@shared/notification/notification";
import NotificationError from "../../@shared/notification/notification.error";

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
    if (this.notification.hasErrors()) {
      throw new NotificationError(this.notification.getErrors());
    }
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
    if (!this._street) {
      this.notification.addError({
        message: "Street is required",
        context: "customer",
      });
    }
    if (!this._number) {
      this.notification.addError({
        message: "Number is required",
        context: "customer",
      });
    }
    if (!this._zip) {
      this.notification.addError({
        message: "Zip is required",
        context: "customer",
      });
    }
    if (!this._city) {
      this.notification.addError({
        message: "City is required",
        context: "customer",
      });
    }
  }

  toString() {
    return `${this._street}, ${this._number}, ${this._zip} ${this._city}`;
  }
}
