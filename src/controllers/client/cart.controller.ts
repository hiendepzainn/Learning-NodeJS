import { Request, Response } from "express";
import {
  getCartDetailsByCartIDJoinProduct,
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

export { getCartPage };
