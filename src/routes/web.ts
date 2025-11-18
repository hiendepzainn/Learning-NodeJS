import { Express } from "express";
import { getHomePage } from "../controllers/user.controller";
import {
  getProductPageClient,
  postAddProductToCart,
} from "../controllers/client/product.controller";
import {
  getLoginPage,
  getRegisterPage,
  getSuccessLoginPage,
  postLogout,
  postRegister,
} from "../controllers/authentication.controller";
import passport from "passport";
import { checkAdmin, checkLogin } from "../middleware/auth";
import { get404Page } from "../controllers/status/status.controller";
import adminRouter from "./adminRouter";
import { getCartPage } from "../controllers/client/cart.controller";

export const initRouters = (app: Express) => {
  // CLIENT
  app.get("/", getHomePage);
  app.get("/product/:id", getProductPageClient);

  // Product (client)
  app.post("/addProductToCart/:id", postAddProductToCart);

  // Cart (client)
  app.get("/cart", getCartPage);

  // Authentication
  app.get("/login", checkLogin, getLoginPage);
  app.post(
    "/login",
    passport.authenticate("local", {
      successRedirect: "/successLoginPage",
      failureRedirect: "/login",
      failureMessage: true,
    })
  );
  app.get("/register", checkLogin, getRegisterPage);
  app.post("/register", postRegister);
  app.get("/successLoginPage", getSuccessLoginPage);
  app.post("/logout", postLogout);

  // ADMIN - check access ADMIN page (handle 403 Forbidden page)
  app.use("/admin", checkAdmin, adminRouter);

  //handle 404 Not Found page
  app.use(get404Page);
};
