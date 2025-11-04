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
  postCreateProduct,
  postDeleteProduct,
} from "../controllers/admin/product.controller";

export const initRouters = (app: Express) => {
  // CLIENT
  app.get("/", getHomePage);
  app.get("/product/:id", getProductPageClient);

  // ADMIN
  app.get("/admin", getDashboardPage);

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

  // order module
  app.get("/admin/order", getOrderPage);
};
