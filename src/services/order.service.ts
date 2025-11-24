import { prisma } from "../config/client";

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

export {
  getAllOrderWithUser,
  getOrderDetailsWithProductByOrderID,
  getOrdersWithOrderDetailWithProductByUserID,
};
