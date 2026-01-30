import { Request, Response } from "express";
import {
  createOrderAndOrderDetail,
  decreaseSumCart,
  deleteCartByID,
  deleteCartDetailAndCart,
  deleteCartDetailByID,
  getCartDetailsByCartIDJoinProduct,
  getCartDetailsByID,
  getCartFromUserID,
  updateCartDetail,
  updateQuantityCart,
} from "../../services/cart.service";
import { createURL } from "../../services/payment.service";

const getCartPage = async (req: Request, res: Response) => {
  const user = req.user as any;
  if (!user) {
    return res.redirect("/login");
  }

  const cart = await getCartFromUserID(user.id);
  if (!cart) {
    return res.render("client/cart/cart.ejs", {
      cartDetails: [],
      total: 0,
    });
  }
  const cartID = cart.id;
  const cartDetails = await getCartDetailsByCartIDJoinProduct(cartID);
  let total = 0;
  cartDetails.forEach((item) => {
    total += item.quantity * item.price;
  });

  res.render("client/cart/cart.ejs", {
    cartDetails: cartDetails,
    total: total,
  });
};

const postDeleteCartDetailByID = async (req: Request, res: Response) => {
  const id: number = Number(req.params.id);

  // Lấy quantity của CartDetail đó
  const cartDetail = await getCartDetailsByID(id);
  const quantity = cartDetail.quantity;

  // Lấy sum của Cart chứa CartDetail đó
  const user = req.user as any;
  const sum = user.sumCart;

  // So sánh, nếu < thì xóa CartDetail, ko thì xóa CartDetail + xóa Cart
  const cartID = cartDetail.cartID;
  if (quantity < sum) {
    await deleteCartDetailByID(id);
    await decreaseSumCart(cartID, quantity);
  } else {
    await deleteCartDetailByID(id);
    await deleteCartByID(cartID);
  }
  return res.redirect("/cart");
};

const getCheckOutPage = async (req: Request, res: Response) => {
  const user = req.user as any;
  if (!user) {
    return res.redirect("/login");
  }

  const cart = await getCartFromUserID(user.id);
  if (!cart) {
    return res.render("client/cart/cart.ejs", {
      cartDetails: [],
      total: 0,
    });
  }

  const cartID = cart.id;
  const cartDetails = await getCartDetailsByCartIDJoinProduct(cartID);
  let total = 0;
  cartDetails.forEach((item) => {
    total += item.quantity * item.price;
  });

  res.render("client/cart/checkout.ejs", {
    cartDetails: cartDetails,
    total: total,
  });
};

const postConfirmCart = async (req: Request, res: Response) => {
  const newCartDetails: { id: string; quantity: string }[] = req.body.item;
  let sumCart = 0;
  newCartDetails.forEach(async (item) => {
    sumCart += +item.quantity;
    await updateCartDetail(+item.id, +item.quantity);
  });
  const cartDetail = await getCartDetailsByID(+newCartDetails[0].id);
  const cartID = cartDetail.cartID;
  await updateQuantityCart(cartID, sumCart);

  res.redirect("/checkout");
};

const postCreateOrder = async (req: Request, res: Response) => {
  const { receiverName, receiverAddress, receiverPhone, total } = req.body;
  const user = req.user as any;
  const userID = user.id;

  // Tạo Order - OrderDetail
  const orderID = await createOrderAndOrderDetail(
    receiverName,
    receiverAddress,
    receiverPhone,
    +total,
    userID,
  );

  const url = createURL(orderID);

  res.redirect(url);
};

const getThankyouPage = async (req: Request, res: Response) => {
  res.render("client/cart/thankyou.ejs");
};

export {
  getCartPage,
  postDeleteCartDetailByID,
  getCheckOutPage,
  postConfirmCart,
  postCreateOrder,
  getThankyouPage,
};
