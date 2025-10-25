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

const multer = require("multer");
const upload = multer({ dest: "uploads/" });

export const initRouters = (app: Express) => {
  app.get("/", getHomePage);

  app.post("/handle-delete-user/:id", postDeleteUser);
  app.get("/handle-view-user/:id", getViewUser);
  app.post("/handle-update-user/:id", postUpdateUser);

  // ADMIN
  app.get("/admin", getDashboardPage);
  app.get("/admin/user", getUserPage);
  app.get("/admin/create-user", getCreateUserPage);
  app.post(
    "/admin/handle-create-user",
    upload.single("avatar"),
    // postCreateUser
    (req, res) => {
      console.log(req.file);
      console.log(req.body);
      res.send("ok");
    }
  );
  app.get("/admin/order", getOrderPage);
  app.get("/admin/product", getProductPage);
};
