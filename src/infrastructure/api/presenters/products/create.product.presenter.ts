import { toXML } from "jstoxml";
import { OutputCreateProductDto } from "../../../../usecase/product/create/create.product.dto";

export class CreateProductPresenter {
  static toXML(data: OutputCreateProductDto): string {
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
