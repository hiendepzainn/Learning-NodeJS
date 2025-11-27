import { prisma } from "../config/client";
import { PAGE_SIZE } from "../config/constant";

const getAllOrderWithUser = async () => {
  const orders = prisma.order.findMany({ include: { user: true } });
  return orders;
};

const getOrderDetailsWithProductByOrderID = async (ID) => {
  const orderDetails = await prisma.orderDetail.findMany({
    where: {
      orderID: ID,
    },
    include: {
      product: true,
    },
  });

  return orderDetails;
};

const getOrdersWithOrderDetailWithProductByUserID = async (userID) => {
  const orders = await prisma.order.findMany({
    where: {
      userID: userID,
    },
    include: {
      orderDetails: {
        include: {
          product: true,
        },
      },
    },
  });

  return orders;
};

const getOrdersByPage = async (page: number) => {
  const orders = await prisma.order.findMany({
    skip: (page - 1) * PAGE_SIZE,
    take: PAGE_SIZE,
    include: {
      user: true,
    },
  });

  return orders;
};

const getTotalPageOrder = async () => {
  const countOrder = await prisma.order.count();
  const totalPage = Math.ceil(countOrder / PAGE_SIZE);

  return totalPage;
};

export {
  getAllOrderWithUser,
  getOrderDetailsWithProductByOrderID,
  getOrdersWithOrderDetailWithProductByUserID,
  getOrdersByPage,
  getTotalPageOrder,
};
