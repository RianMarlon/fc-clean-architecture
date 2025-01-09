import { toXML } from "jstoxml";
import { OutputCreateCustomerDto } from "../../../../usecase/customer/create/create.customer.dto";

export class CreateCustomerPresenter {
  static toXML(data: OutputCreateCustomerDto): string {
    const xmlOption = {
      header: true,
      indent: " ",
      newLine: "\n",
      allowEmpty: true,
    };

    return toXML(
      {
        customer: {
          id: data.id,
          name: data.name,
          address: {
            street: data.address.street,
            number: data.address.number,
            zip: data.address.zip,
            city: data.address.city,
          },
        },
      },
      xmlOption
    );
  }
}
