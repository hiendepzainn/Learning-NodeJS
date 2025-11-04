import { prisma } from "../config/client";

const handleCreateProduct = async (
  name: string,
  price: number,
  detailDesc: string,
  shortDesc: string,
  quantity: number,
  factory: string,
  target: string,
  image: string
) => {
  await prisma.product.create({
    data: {
      name: name,
      price: price,
      factory: factory,
      detailDesc: detailDesc,
      shortDesc: shortDesc,
      image: image,
      quantity: quantity,
      target: target,
    },
  });
};

export { handleCreateProduct };
