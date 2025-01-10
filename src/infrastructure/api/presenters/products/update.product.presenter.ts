import { toXML } from "jstoxml";
import { OutputUpdateProductDto } from "../../../../usecase/product/update/update.product.dto";

export class UpdateProductPresenter {
  static toXML(data: OutputUpdateProductDto): string {
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
