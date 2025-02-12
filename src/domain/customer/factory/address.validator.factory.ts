import ValidatorInterface from "../../@shared/validator/validator.interface";
import { AddressYupValidator } from "../validator/address.yup.validator";
import Address from "../value-object/address";

export class AddressValidatorFactory {
  static create(): ValidatorInterface<Address> {
    return new AddressYupValidator();
  }
}
