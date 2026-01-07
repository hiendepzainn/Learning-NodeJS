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
import {
  buildFullQuery,
  buildQuery,
  getProductsFilter,
} from "../../services/product.filter";
import { getCurrentTime } from "../../services/chat.service";

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

  //get QUERY
  const { page } = req.query;
  let query;
  if (page) {
    query = `?page=${+page}`;
  } else {
    query = ``;
  }

  if (!cart) {
    // CREATE
    await createNewCart(quantity, userID, productID);
  } else {
    // UPDATE
    await updateSumOfCart(quantity, userID);
    await upsertCartDetail(quantity, userID, productID);
  }

  res.redirect(`/${query}`);
};

const postAddToCartFilter = async (req: Request, res: Response) => {
  const user = req.user as any;
  if (!user) {
    return res.redirect("/login");
  }

  const quantity = 1;
  const userID = user.id;
  const productID: number = Number(req.params.id);
  const cart = await getCartFromUserID(userID);

  //build QUERY
  const { factory, target, price, sort, page } = req.query;
  const query = buildFullQuery(
    String(factory),
    String(target),
    String(price),
    String(sort),
    String(page)
  );

  if (!cart) {
    // CREATE
    await createNewCart(quantity, userID, productID);
  } else {
    // UPDATE
    await updateSumOfCart(quantity, userID);
    await upsertCartDetail(quantity, userID, productID);
  }

  res.redirect(`/products?${query}`);
};

const postAddProductWithQuantity = async (req: Request, res: Response) => {
  const user = req.user as any;
  if (!user) {
    return res.redirect("/login");
  }

  const { productID, quantity } = req.body;
  const userID = user.id;

  const cart = await getCartFromUserID(userID);

  if (!cart) {
    // CREATE
    await createNewCart(+quantity, userID, +productID);
  } else {
    // UPDATE
    await updateSumOfCart(+quantity, userID);
    await upsertCartDetail(+quantity, userID, +productID);
  }

  res.redirect(`product/${+productID}`);
};

const getProductsPage = async (req: Request, res: Response) => {
  const { page } = req.query;
  let currentPage;
  if (page) {
    currentPage = +page > 0 ? +page : 1;
  } else {
    currentPage = 1;
  }

  const pageSizeFilter = 6;
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

  const startTime = getCurrentTime();

  return res.render("client/product/products.ejs", {
    listProducts: products.data,
    page: currentPage,
    totalPage: totalPage,
    listFactory: factory ? factory : [],
    listTarget: target ? target : [],
    listPrice: price ? price : [],
    sort: sort ? sort : "none",
    query: query,
    startTime: startTime,
  });
};

export {
  getProductPageClient,
  postAddProductToCart,
  postAddProductWithQuantity,
  getProductsPage,
  postAddToCartFilter,
};
