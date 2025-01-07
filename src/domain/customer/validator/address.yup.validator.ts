import NotificationError from "../../@shared/notification/notification.error";
import ValidatorInterface from "../../@shared/validator/validator.interface";
import Address from "../value-object/address";
import * as yup from "yup";

export class AddressYupValidator implements ValidatorInterface<Address> {
  validate(entity: Address): void {
    try {
      yup
        .object()
        .shape({
          number: yup.number().required("Number is required"),
          street: yup.string().required("Street is required"),
          zip: yup.string().required("Zip is required"),
          city: yup.string().required("City is required"),
        })
        .validateSync(
          {
            number: entity.number,
            street: entity.street,
            zip: entity.zip,
            city: entity.city,
          },
          {
            abortEarly: false,
          }
        );
    } catch (errors) {
      const e = errors as yup.ValidationError;
      e.errors.map((error) => {
        entity.notification.addError({
          context: "customer.address",
          message: error,
        });
      });
    }
  }
}
