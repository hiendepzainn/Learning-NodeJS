import { prisma } from "../config/client";
import { getProductByID } from "./product.service";

const getCartFromUserID = async (id: number) => {
  const cart = await prisma.cart.findUnique({
    where: {
      userID: id,
    },
  });

  return cart;
};

const createNewCart = async (quantity, userID, productID) => {
  const product = await getProductByID(productID);
  await prisma.cart.create({
    data: {
      sum: quantity,
      userID: userID,
      cartDetails: {
        create: [
          {
            price: product.price,
            quantity: quantity,
            productID: productID,
          },
        ],
      },
    },
  });
};

const updateSumOfCart = async (quantity, userID) => {
  await prisma.cart.update({
    where: {
      userID: userID,
    },
    data: {
      sum: {
        increment: quantity,
      },
    },
  });
};

const upsertCartDetail = async (quantity, userID, productID) => {
  const cart = await getCartFromUserID(userID);
  const product = await getProductByID(productID);

  const cartDetail = await prisma.cartDetail.findMany({
    where: {
      AND: [
        {
          cartID: cart.id,
        },
        {
          productID: product.id,
        },
      ],
    },
  });

  let idForFind;
  if (cartDetail.length === 1) {
    idForFind = cartDetail[0].id;
  } else {
    idForFind = 0;
  }

  await prisma.cartDetail.upsert({
    where: {
      id: idForFind,
    },
    update: {
      quantity: {
        increment: quantity,
      },
    },
    create: {
      price: product.price,
      quantity: quantity,
      productID: product.id,
      cartID: cart.id,
    },
  });
};

const getSumCartByID = async (id) => {
  const cart = await prisma.cart.findUnique({
    where: {
      userID: id,
    },
  });

  return cart?.sum ?? 0;
};

const getCartDetailsByCartIDJoinProduct = async (cartID) => {
  const cartDetails = await prisma.cartDetail.findMany({
    where: {
      cartID: cartID,
    },
    include: {
      product: true,
    },
  });

  return cartDetails;
};

const getCartDetailsByID = async (id) => {
  const cartDetail = await prisma.cartDetail.findUnique({
    where: {
      id: id,
    },
  });

  return cartDetail;
};

const deleteCartDetailByID = async (id) => {
  await prisma.cartDetail.delete({
    where: {
      id: id,
    },
  });
};

const decreaseSumCart = async (cartID, quantity) => {
  await prisma.cart.update({
    where: {
      id: cartID,
    },
    data: {
      sum: {
        decrement: quantity,
      },
    },
  });
};

const deleteCartByID = async (cartID) => {
  await prisma.cart.delete({
    where: {
      id: cartID,
    },
  });
};

const updateCartDetail = async (id: number, quantity: number) => {
  await prisma.cartDetail.update({
    where: {
      id: id,
    },
    data: {
      quantity: quantity,
    },
  });
};

export {
  getCartFromUserID,
  createNewCart,
  updateSumOfCart,
  upsertCartDetail,
  getSumCartByID,
  getCartDetailsByCartIDJoinProduct,
  getCartDetailsByID,
  deleteCartDetailByID,
  decreaseSumCart,
  deleteCartByID,
  updateCartDetail,
};
