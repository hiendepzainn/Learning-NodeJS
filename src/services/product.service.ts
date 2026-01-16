import { prisma } from "../config/client";
import { PAGE_SIZE } from "../config/constant";

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
  image: string,
  model: string
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
      model: model,
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
  image: string,
  model: string
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
      model: model,
    },
  });
};

const getProductsByPage = async (page: number) => {
  const products = await prisma.product.findMany({
    skip: (page - 1) * PAGE_SIZE,
    take: PAGE_SIZE,
  });

  return products;
};

const getTotalPageProduct = async () => {
  const countProducts = await prisma.product.count();
  const totalPage = Math.ceil(countProducts / PAGE_SIZE);

  return totalPage;
};

const getProductsByPageClient = async (page: number, pageSize: number) => {
  const products = await prisma.product.findMany({
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  return products;
};

const getTotalPageProductClient = async (pageSize: number) => {
  const countProducts = await prisma.product.count();
  const totalPage = Math.ceil(countProducts / pageSize);

  return totalPage;
};

export {
  handleCreateProduct,
  getAllProducts,
  handleDeleteProduct,
  getProductByID,
  handleUpdateProduct,
  getProductsByPage,
  getTotalPageProduct,
  getProductsByPageClient,
  getTotalPageProductClient,
};
