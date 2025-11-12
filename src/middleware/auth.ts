import { NextFunction, Request, Response } from "express";

const checkLogin = (req: Request, res: Response, next: NextFunction) => {
  const isLogin = req.isAuthenticated();
  if (isLogin) {
    res.redirect("/");
  } else {
    next();
  }
};

const checkAdmin = (req: Request, res: Response, next: NextFunction) => {
  const user = req.user as any;
  const roleName = user.role.name;
  if (roleName === "ADMIN") {
    next();
  } else {
    res.redirect("/");
  }
};

export { checkLogin, checkAdmin };
