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
  getUserPage,
} from "../controllers/admin/dashboard.controller";

export const initRouters = (app: Express) => {
  app.get("/", getHomePage);
  app.get("/create-user", getCreateUserPage);
  app.post("/handle-create-user", postCreateUser);
  app.post("/handle-delete-user/:id", postDeleteUser);
  app.get("/handle-view-user/:id", getViewUser);
  app.post("/handle-update-user/:id", postUpdateUser);

  // ADMIN
  app.get("/admin", getDashboardPage);
  app.get("/admin/user", getUserPage);
};
