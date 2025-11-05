import { Request, Response } from "express";
import { getProductByID } from "../../services/product.service";

const getProductPageClient = async (req: Request, res: Response) => {
  const id: number = Number(req.params.id);
  const product = await getProductByID(id);
  return res.render("client/product/details.ejs", {
    product: product,
  });
};

export { getProductPageClient };
