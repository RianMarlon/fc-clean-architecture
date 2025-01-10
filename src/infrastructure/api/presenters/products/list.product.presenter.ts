import { toXML } from "jstoxml";
import { OutputListProductDto } from "../../../../usecase/product/list/list.product.dto";

export class ListProductPresenter {
  static toXML(data: OutputListProductDto): string {
    const xmlOption = {
      header: true,
      indent: " ",
      newLine: "\n",
      allowEmpty: true,
    };

    return toXML(
      {
        products: {
          product: data.products.map((product) => ({
            id: product.id,
            name: product.name,
            price: product.price,
          })),
        },
      },
      xmlOption
    );
  }
}
