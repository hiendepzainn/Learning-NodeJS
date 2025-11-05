import { Request, Response } from "express";

const getLoginPage = (req: Request, res: Response) => {
  return res.render("login.ejs");
};

const getRegisterPage = (req: Request, res: Response) => {
  return res.render("register.ejs");
};

export { getLoginPage, getRegisterPage };
