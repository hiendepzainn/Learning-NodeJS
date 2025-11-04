import { prisma } from "../config/client";

const getAllProducts = async () => {
  const listProducts = await prisma.product.findMany();
  return listProducts;
};

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

const handleDeleteProduct = async (id: number) => {
  await prisma.product.delete({
    where: {
      id: id,
    },
  });
};

const getProductByID = async (id: number) => {
  const product = await prisma.product.findUnique({
    where: {
      id: id,
    },
  });
  return product;
};

const handleUpdateProduct = async (
  id: number,
  name: string,
  price: number,
  detailDesc: string,
  shortDesc: string,
  quantity: number,
  factory: string,
  target: string,
  image: string
) => {
  await prisma.product.update({
    where: {
      id: id,
    },
    data: {
      name: name,
      price: price,
      detailDesc: detailDesc,
      shortDesc: shortDesc,
      quantity: quantity,
      factory: factory,
      target: target,
      image: image,
      sold: 0,
    },
  });
};

export {
  handleCreateProduct,
  getAllProducts,
  handleDeleteProduct,
  getProductByID,
  handleUpdateProduct,
};
