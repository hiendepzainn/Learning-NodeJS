import { Router } from "express";
import {
  getDashboardPage,
  getOrderPage,
  getProductPage,
  getUserPage,
} from "../controllers/admin/dashboard.controller";
import {
  getCreateUserPage,
  getViewUser,
  postCreateUser,
  postDeleteUser,
  postUpdateUser,
} from "../controllers/user.controller";
import fileUploadMiddleware from "../middleware/multer";
import {
  getCreateProductPage,
  getViewProduct,
  postCreateProduct,
  postDeleteProduct,
  postUpdateProduct,
} from "../controllers/admin/product.controller";

const adminRouter = Router();
// ADMIN
adminRouter.get("/", getDashboardPage);

// USER module
adminRouter.get("/user", getUserPage);
adminRouter.get("/create-user", getCreateUserPage);
adminRouter.post(
  "/handle-create-user",
  fileUploadMiddleware("avatar"),
  postCreateUser
);
adminRouter.post("/delete-user/:id", postDeleteUser);
adminRouter.get("/view-user/:id", getViewUser);
adminRouter.post(
  "/update-user/:id",
  fileUploadMiddleware("avatar"),
  postUpdateUser
);

// PRODUCT module
adminRouter.get("/product", getProductPage);
adminRouter.get("/create-product", getCreateProductPage);
adminRouter.post(
  "/create-product",
  fileUploadMiddleware("image", "images/product"),
  postCreateProduct
);
adminRouter.post("/delete-product/:id", postDeleteProduct);
adminRouter.get("/view-product/:id", getViewProduct);
adminRouter.post(
  "/update-product/:id",
  fileUploadMiddleware("image", "images/product"),
  postUpdateProduct
);

// ORDER module
adminRouter.get("/order", getOrderPage);

export default adminRouter;
