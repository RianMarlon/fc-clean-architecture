import ValidatorInterface from "../../@shared/validator/validator.interface";
import Product from "../entity/product";
import * as yup from "yup";
import ProductB from "../entity/product-b";

export class ProductYupValidator
  implements ValidatorInterface<Product | ProductB>
{
  validate(entity: Product | ProductB): void {
    try {
      yup
        .object()
        .shape({
          id: yup.string().required("Id is required"),
          name: yup.string().required("Name is required"),
          price: yup
            .number()
            .min(0, "Price must be greater or equal than zero")
            .required("Price is required"),
        })
        .validateSync(
          {
            id: entity.id,
            name: entity.name,
            price: entity.price,
          },
          {
            abortEarly: false,
          }
        );
    } catch (error) {
      const e = error as yup.ValidationError;
      e.errors.map((error) => {
        entity.notification.addError({
          context: "product",
          message: error,
        });
      });
    }
  }
}
