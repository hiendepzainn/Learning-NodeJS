import { Request, Response } from "express";
import { getTotalPagesUser, getUsersByPage } from "../../services/user.service";
import {
  getProductsByPage,
  getTotalPageProduct,
} from "../../services/product.service";
import {
  getOrdersByPage,
  getTotalPageOrder,
} from "../../services/order.service";
import { getCountInforDashboard } from "../../services/dashboard.service";

const getDashboardPage = async (req: Request, res: Response) => {
  const countInfors = await getCountInforDashboard();
  return res.render("admin/dashboard/show.ejs", { infor: countInfors });
};

const getUserPage = async (req: Request, res: Response) => {
  const { page } = req.query;
  let currentPage = 1;

  if (+page > 0) {
    currentPage = +page;
  }
  const users = await getUsersByPage(currentPage);
  const totalPages = await getTotalPagesUser();

  return res.render("admin/user/show.ejs", {
    listUsers: users,
    totalPages: totalPages,
    page: +currentPage,
  });
};

const getOrderPage = async (req: Request, res: Response) => {
  const { page } = req.query;
  let currentPage;
  if (page) {
    currentPage = +page <= 0 ? 1 : +page;
  } else {
    currentPage = 1;
  }

  const totalPage = await getTotalPageOrder();
  const listOrders = await getOrdersByPage(currentPage);
  return res.render("admin/order/show.ejs", {
    listOrders: listOrders,
    totalPage: totalPage,
    page: currentPage,
  });
};

const getProductPage = async (req: Request, res: Response) => {
  const { page } = req.query;
  let currentPage;
  if (page) {
    currentPage = +page <= 0 ? 1 : +page;
  } else {
    currentPage = 1;
  }

  const products = await getProductsByPage(currentPage);
  const totalPage = await getTotalPageProduct();

  return res.render("admin/product/show.ejs", {
    listProducts: products,
    totalPage: totalPage,
    page: currentPage,
  });
};

export { getDashboardPage, getUserPage, getOrderPage, getProductPage };
