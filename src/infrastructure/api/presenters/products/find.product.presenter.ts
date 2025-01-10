import { toXML } from "jstoxml";
import { OutputFindProductDto } from "../../../../usecase/product/find/find.product.dto";

export class FindProductPresenter {
  static toXML(data: OutputFindProductDto): string {
    const xmlOption = {
      header: true,
      indent: " ",
      newLine: "\n",
      allowEmpty: true,
    };

    return toXML(
      {
        product: {
          id: data.id,
          name: data.name,
          price: data.price,
        },
      },
      xmlOption
    );
  }
}
