import { Request, Response } from "express";
import { getAllUsers } from "../../services/user.service";

const getDashboardPage = (req: Request, res: Response) => {
  return res.render("admin/dashboard/show.ejs");
};

const getUserPage = async (req: Request, res: Response) => {
  const users = await getAllUsers();
  return res.render("admin/user/show.ejs", {
    listUsers: users,
  });
};

const getOrderPage = (req: Request, res: Response) => {
  return res.render("admin/order/show.ejs");
};

const getProductPage = (req: Request, res: Response) => {
  return res.render("admin/product/show.ejs");
};

export { getDashboardPage, getUserPage, getOrderPage, getProductPage };
