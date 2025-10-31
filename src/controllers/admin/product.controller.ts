import { Request, Response } from "express";
import { ProductSchema, TProductSchema } from "../../validation/product.schema";

const getCreateProductPage = async (req: Request, res: Response) => {
  return res.render("admin/product/create.ejs");
};

const postCreateProduct = async (req: Request, res: Response) => {
  const {} = req.body as TProductSchema;

  try {
    const result = ProductSchema.parse(req.body);
    console.log(result);
  } catch (error) {
    console.log(error);
  }

  return res.redirect("/admin/product");
};

export { getCreateProductPage, postCreateProduct };
