import { Request, Response } from "express";

const getProductPageClient = (req: Request, res: Response) => {
  return res.render("client/product/details.ejs");
};

export { getProductPageClient };
