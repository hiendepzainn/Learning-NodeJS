import { Request, Response } from "express";

const getDashboardPage = (req: Request, res: Response) => {
  return res.render("admin/dashboard/show.ejs");
};

const getUserPage = (req: Request, res: Response) => {
  return res.render("admin/user/show.ejs");
};

export { getDashboardPage, getUserPage };
