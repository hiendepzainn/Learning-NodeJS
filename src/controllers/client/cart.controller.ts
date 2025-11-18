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
  const cartID = cart.id;
  const cartDetails = await getCartDetailsByCartIDJoinProduct(cartID);
  console.log(cartDetails);

  res.render("client/cart/cart.ejs", {
    cartDetails: cartDetails,
  });
};

export { getCartPage };
