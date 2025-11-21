import { Request, Response } from "express";
import {
  decreaseSumCart,
  deleteCartByID,
  deleteCartDetailByID,
  getCartDetailsByCartIDJoinProduct,
  getCartDetailsByID,
  getCartFromUserID,
} from "../../services/cart.service";

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

export { getCartPage, postDeleteCartDetailByID, getCheckOutPage };
