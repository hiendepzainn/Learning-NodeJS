import { Request, Response } from "express";
import { getProductByID } from "../../services/product.service";
import {
  createNewCart,
  getCartFromUserID,
  updateSumOfCart,
  upsertCartDetail,
} from "../../services/cart.service";

const getProductPageClient = async (req: Request, res: Response) => {
  const id: number = Number(req.params.id);
  const product = await getProductByID(id);
  return res.render("client/product/details.ejs", {
    product: product,
  });
};

const postAddProductToCart = async (req: Request, res: Response) => {
  const user = req.user as any;
  if (!user) {
    return res.redirect("/login");
  }

  const quantity = 1;
  const userID = user.id;
  const productID: number = Number(req.params.id);
  const cart = await getCartFromUserID(userID);
  // CREATE
  if (!cart) {
    await createNewCart(quantity, userID, productID);
    return res.redirect("/");
  }

  // UPDATE
  await updateSumOfCart(quantity, userID);
  await upsertCartDetail(quantity, userID, productID);

  res.redirect("/");
};

const postAddProductWithQuantity = async (req: Request, res: Response) => {
  const user = req.user as any;
  if (!user) {
    return res.redirect("/login");
  }

  const { productID, quantity } = req.body;
  const userID = user.id;

  const cart = await getCartFromUserID(userID);

  // CREATE
  if (!cart) {
    await createNewCart(+quantity, userID, +productID);
    return res.redirect("/");
  }

  // UPDATE
  await updateSumOfCart(+quantity, userID);
  await upsertCartDetail(+quantity, userID, +productID);
  res.redirect("/");
};

export {
  getProductPageClient,
  postAddProductToCart,
  postAddProductWithQuantity,
};
