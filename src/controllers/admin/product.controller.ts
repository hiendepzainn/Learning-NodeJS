import { Request, Response } from "express";
import { ProductSchema, TProductSchema } from "../../validation/product.schema";
import {
  getProductByID,
  handleCreateProduct,
  handleDeleteProduct,
  handleUpdateProduct,
} from "../../services/product.service";
import { regenerate } from "../../services/regenerate.service";

const getCreateProductPage = async (req: Request, res: Response) => {
  return res.render("admin/product/create.ejs", {
    listErrors: undefined,
    product: {
      name: "",
      price: "",
      detailDesc: "",
      shortDesc: "",
      quantity: "",
      factory: "canon",
      target: "beginner",
    },
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
    console.log(result);
    const { name, price, detailDesc, shortDesc, quantity, factory, target } =
      result.data;
    const files = req.files as {
      image?: Express.Multer.File[];
      model?: Express.Multer.File[];
    };

    console.log("files:", files);
    const image = files?.image?.[0]?.filename ?? null;
    const model = files?.model?.[0]?.filename ?? null;

    await handleCreateProduct(
      name,
      price,
      detailDesc,
      shortDesc,
      quantity,
      factory,
      target,
      image,
      model
    );

    regenerate();

    return res.redirect("/admin/product");
  } else {
    return res.render("admin/product/create.ejs", {
      listErrors: result.error.issues,
      product: processedData,
    });
  }
};

const postDeleteProduct = async (req: Request, res: Response) => {
  const id: number = Number(req.params.id);
  await handleDeleteProduct(id);

  regenerate();

  return res.redirect("/admin/product");
};

const getViewProduct = async (req: Request, res: Response) => {
  const id: number = Number(req.params.id);
  const product = await getProductByID(id);
  return res.render("admin/product/details.ejs", {
    product: product,
  });
};

const postUpdateProduct = async (req: Request, res: Response) => {
  const id: number = Number(req.params.id);
  const { name, price, detailDesc, shortDesc, quantity, factory, target } =
    req.body as TProductSchema;

  const files = req.files as {
    image?: Express.Multer.File[];
    model?: Express.Multer.File[];
  };

  let image = files?.image?.[0]?.filename ?? null;
  let model = files?.model?.[0]?.filename ?? null;
  const product = await getProductByID(id);

  if (!image) {
    image = product.image;
  }

  if (!model) {
    model = product.model;
  }

  await handleUpdateProduct(
    id,
    name,
    Number(price),
    detailDesc,
    shortDesc,
    Number(quantity),
    factory,
    target,
    image,
    model
  );

  await regenerate();

  return res.redirect("/admin/product");
};

export {
  getCreateProductPage,
  postCreateProduct,
  postDeleteProduct,
  getViewProduct,
  postUpdateProduct,
};
