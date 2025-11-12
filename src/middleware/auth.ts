import { NextFunction, Request, Response } from "express";

const checkLogin = (req: Request, res: Response, next: NextFunction) => {
  const isLogin = req.isAuthenticated();
  if (isLogin) {
    res.redirect("/");
  } else {
    next();
  }
};

export { checkLogin };
