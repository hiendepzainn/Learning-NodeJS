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

export const initRouters = (app: Express) => {
  app.get("/", getHomePage);

  app.get("/handle-view-user/:id", getViewUser);
  app.post("/handle-update-user/:id", postUpdateUser);

  // ADMIN
  app.get("/admin", getDashboardPage);

  app.get("/admin/user", getUserPage);
  app.get("/admin/create-user", getCreateUserPage);
  app.post(
    "/admin/handle-create-user",
    fileUploadMiddleware("avatar"),
    postCreateUser
  );
  app.post("/admin/delete-user/:id", postDeleteUser);

  app.get("/admin/order", getOrderPage);
  app.get("/admin/product", getProductPage);
};
