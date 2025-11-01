import { Request, Response } from "express";
import { ProductSchema, TProductSchema } from "../../validation/product.schema";

const getCreateProductPage = async (req: Request, res: Response) => {
  return res.render("admin/product/create.ejs", {
    listErrors: undefined,
  });
};

const postCreateProduct = async (req: Request, res: Response) => {
  const { name, price, detailDesc, shortDesc, quantity, factory, target } =
    req.body as TProductSchema;

  let processedData: TProductSchema = {
    name,
    price: Number(price),
    detailDesc,
    shortDesc,
    quantity: Number(quantity),
    factory,
    target,
  };

  const result = ProductSchema.safeParse(processedData);
  if (result.success) {
    // insert to Database

    return res.redirect("/admin/product");
  } else {
    return res.render("admin/product/create.ejs", {
      listErrors: result.error.issues,
    });
  }
};

export { getCreateProductPage, postCreateProduct };
