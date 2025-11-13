import { NextFunction, Request, Response } from "express";
import { RegisterSchema } from "../validation/authentication.schema";
import { error } from "console";
import { insertUserToDatabase } from "../services/authentication.service";

const getLoginPage = (req: Request, res: Response) => {
  const session: any = req.session;

  if (session.messages) {
    // get final message
    const error = session.messages[session.messages.length - 1];

    // reset req.session.messages
    session.messages = [];

    return res.render("login.ejs", {
      error: error,
    });
  }
  return res.render("login.ejs", { error: undefined });
};

const getSuccessLoginPage = (req: Request, res: Response) => {
  const user = req.user as any;
  const roleName = user.role.name;
  if (roleName === "ADMIN") {
    res.redirect("/admin");
  } else {
    res.redirect("/");
  }
};

const getRegisterPage = (req: Request, res: Response) => {
  return res.render("register.ejs", {
    listErrors: undefined,
    oldData: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
};

const postRegister = async (req: Request, res: Response) => {
  const { fullName, email, password, confirmPassword } = req.body;

  // validate data
  const validateResult = await RegisterSchema.safeParseAsync(req.body);

  if (validateResult.success) {
    // insert to DB
    await insertUserToDatabase(fullName, email, password);

    res.redirect("/login");
  } else {
    return res.render("register.ejs", {
      listErrors: validateResult.error.issues,
      oldData: req.body,
    });
  }
};

const postLogout = (req: Request, res: Response, next: NextFunction) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
};

export {
  getLoginPage,
  getRegisterPage,
  postRegister,
  getSuccessLoginPage,
  postLogout,
};
