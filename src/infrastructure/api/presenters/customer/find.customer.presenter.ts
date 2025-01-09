import { toXML } from "jstoxml";
import { OutputFindCustomerDto } from "../../../../usecase/customer/find/find.customer.dto";

export class FindCustomerPresenter {
  static toXML(data: OutputFindCustomerDto): string {
    const xmlOption = {
      header: true,
      indent: " ",
      newline: "\n",
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
