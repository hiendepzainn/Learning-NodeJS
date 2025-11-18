import { Request, Response } from "express";

const getCartPage = async (req: Request, res: Response) => {
  const user = req.user;
  if (!user) {
    return res.redirect("/login");
  }
  res.render("client/cart/cart.ejs");
};

export { getCartPage };
