import { Express } from "express";

import adminRouter from "./adminRouter";
import APIRouter from "./api";
import clientRouter from "./clientRouter";

import { checkAdmin } from "../middleware/auth";
import { get404Page } from "../controllers/status/status.controller";

export const initRouters = (app: Express) => {
  // CLIENT
  app.use("", clientRouter);

  // ADMIN - check access ADMIN page (handle 403 Forbidden page)
  app.use("/admin", checkAdmin, adminRouter);

  // API Route
  app.use("", APIRouter);

  //handle 404 Not Found page
  app.use(get404Page);
};
