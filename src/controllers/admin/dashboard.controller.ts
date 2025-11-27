import { Request, Response } from "express";
import { getTotalPagesUser, getUsersByPage } from "../../services/user.service";
import { getAllProducts } from "../../services/product.service";
import { getAllOrderWithUser } from "../../services/order.service";
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
  const listOrders = await getAllOrderWithUser();
  return res.render("admin/order/show.ejs", {
    listOrders: listOrders,
  });
};

const getProductPage = async (req: Request, res: Response) => {
  const products = await getAllProducts();
  return res.render("admin/product/show.ejs", {
    listProducts: products,
  });
};

export { getDashboardPage, getUserPage, getOrderPage, getProductPage };
