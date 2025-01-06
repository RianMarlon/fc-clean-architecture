import Entity from "../../@shared/entity/entity.abstract";
import NotificationError from "../../@shared/notification/notification.error";
import Address from "../value-object/address";

export default class Customer extends Entity {
  private _name: string;
  private _address!: Address;
  private _active: boolean = true;
  private _rewardPoints: number = 0;

  constructor(id: string, name: string, address: Address) {
    super();
    this._id = id;
    this._name = name;
    this._address = address;
    this.validate();
  }

  static create(id: string, name: string, address: Address): Customer {
    const customer = new Customer(id, name, address);
    return customer;
  }

  changeAddress(address: Address) {
    this._address = address;
    this.validate();
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get rewardPoints(): number {
    return this._rewardPoints;
  }

  get address(): Address {
    return this._address;
  }

  isActive(): boolean {
    return this._active;
  }

  validate() {
    if (!this._name) {
      this._notification.addError({
        context: "customer",
        message: "Name is required",
      });
    }
    if (!this._address) {
      this._notification.addError({
        context: "customer",
        message: "Address is required",
      });
    }
    if (!this._id) {
      this._notification.addError({
        context: "customer",
        message: "Id is required",
      });
    }
    if (this._notification.hasErrors()) {
      throw new NotificationError(this._notification.getErrors());
    }
  }

  changeName(name: string) {
    this._name = name;
    this.validate();
  }

  changeNameAndAddress(name: string, address: Address) {
    this._name = name;
    this._address = address;
    this.validate();
  }

  activate() {
    this._active = true;
  }

  deactivate() {
    this._active = false;
  }

  addRewardPoints(points: number) {
    this._rewardPoints += points;
  }
}
