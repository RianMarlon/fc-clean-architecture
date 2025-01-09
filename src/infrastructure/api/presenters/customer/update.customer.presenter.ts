import { toXML } from "jstoxml";
import { OutputUpdateCustomerDto } from "../../../../usecase/customer/update/update.customer.dto";

export class UpdateCustomerPresenter {
  static toXML(data: OutputUpdateCustomerDto): string {
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
            number: data.address.number,
            street: data.address.street,
            city: data.address.city,
            zip: data.address.zip,
          },
        },
      },
      xmlOption
    );
  }
}
