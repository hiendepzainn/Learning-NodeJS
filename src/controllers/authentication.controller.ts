import { Request, Response } from "express";
import { RegisterSchema } from "../validation/authentication.schema";
import { error } from "console";
import { insertUserToDatabase } from "../services/authentication.service";

const getLoginPage = (req: Request, res: Response) => {
  return res.render("login.ejs");
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

export { getLoginPage, getRegisterPage, postRegister };
