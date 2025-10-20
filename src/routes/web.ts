import { Express } from "express";
import {
  getCreateUserPage,
  getHomePage,
  postCreateUser,
  postDeleteUser,
} from "../controllers/user.controller";

export const initRouters = (app: Express) => {
  app.get("/", getHomePage);

  app.get("/create-user", getCreateUserPage);

  app.post("/handle-create-user", postCreateUser);

  app.post("/handle-delete-user/:id", postDeleteUser);
};
