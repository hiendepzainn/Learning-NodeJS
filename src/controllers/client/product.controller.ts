import { Request, Response } from "express";
import {
  getProductByID,
  getProductsByPageClient,
  getTotalPageProductClient,
} from "../../services/product.service";
import {
  createNewCart,
  getCartFromUserID,
  updateSumOfCart,
  upsertCartDetail,
} from "../../services/cart.service";
import { buildQuery, getProductsFilter } from "../../services/product.filter";

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

const getProductsPage = async (req: Request, res: Response) => {
  const { page } = req.query;
  let currentPage;
  if (page) {
    currentPage = +page > 0 ? +page : 1;
  } else {
    currentPage = 1;
  }

  const pageSizeFilter = 2;
  const { factory, target, price, sort } = req.query;

  const products = await getProductsFilter(
    currentPage,
    pageSizeFilter,
    String(factory),
    String(target),
    String(price),
    String(sort)
  );

  const totalPage = Math.ceil(products.count / pageSizeFilter);

  //build query in HREF at PAGINATION
  const query = buildQuery(
    String(factory),
    String(target),
    String(price),
    String(sort)
  );

  return res.render("client/product/products.ejs", {
    listProducts: products.data,
    page: currentPage,
    totalPage: totalPage,
    listFactory: factory ? factory : [],
    listTarget: target ? target : [],
    listPrice: price ? price : [],
    sort: sort ? sort : "none",
    query: query,
  });
};

export {
  getProductPageClient,
  postAddProductToCart,
  postAddProductWithQuantity,
  getProductsPage,
};
