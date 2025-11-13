import { Express } from "express";
import {
  getCreateUserPage,
  getHomePage,
  getViewUser,
  postCreateUser,
  postDeleteUser,
  postUpdateUser,
} from "../controllers/user.controller";
import {
  getDashboardPage,
  getOrderPage,
  getProductPage,
  getUserPage,
} from "../controllers/admin/dashboard.controller";
import fileUploadMiddleware from "../middleware/multer";
import { getProductPageClient } from "../controllers/client/product.controller";
import {
  getCreateProductPage,
  getViewProduct,
  postCreateProduct,
  postDeleteProduct,
  postUpdateProduct,
} from "../controllers/admin/product.controller";
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

export const initRouters = (app: Express) => {
  // CLIENT
  app.get("/", getHomePage);
  app.get("/product/:id", getProductPageClient);

  // ADMIN
  app.get("/admin", checkAdmin, getDashboardPage);

  // user module
  app.get("/admin/user", getUserPage);
  app.get("/admin/create-user", getCreateUserPage);
  app.post(
    "/admin/handle-create-user",
    fileUploadMiddleware("avatar"),
    postCreateUser
  );
  app.post("/admin/delete-user/:id", postDeleteUser);
  app.get("/admin/view-user/:id", getViewUser);
  app.post(
    "/admin/update-user/:id",
    fileUploadMiddleware("avatar"),
    postUpdateUser
  );

  // product module
  app.get("/admin/product", getProductPage);
  app.get("/admin/create-product", getCreateProductPage);
  app.post(
    "/admin/create-product",
    fileUploadMiddleware("image", "images/product"),
    postCreateProduct
  );
  app.post("/admin/delete-product/:id", postDeleteProduct);
  app.get("/admin/view-product/:id", getViewProduct);
  app.post(
    "/admin/update-product/:id",
    fileUploadMiddleware("image", "images/product"),
    postUpdateProduct
  );

  // order module
  app.get("/admin/order", getOrderPage);

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

  app.use(get404Page);
};
