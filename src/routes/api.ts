import { Router } from "express";
import {
  getAccount,
  getAllUsersAPI,
  handleLogin,
} from "../controllers/api/api.controller";
import { checkValidJWT } from "../middleware/jwt.middleware";

const APIRouter = Router();

APIRouter.get("/users", checkValidJWT, getAllUsersAPI);
APIRouter.get("/account", checkValidJWT, getAccount);
APIRouter.post("/login", handleLogin);

export default APIRouter;
