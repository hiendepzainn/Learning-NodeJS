import { Request, Response } from "express";

const getCartPage = async (req: Request, res: Response) => {
  res.render("client/cart/cart.ejs");
};

export { getCartPage };
