import { Router } from "express";
import { getAllUsersAPI, handleLogin } from "../controllers/api/api.controller";
import { checkValidJWT } from "../middleware/jwt.middleware";

const APIRouter = Router();

APIRouter.get("/users", checkValidJWT, getAllUsersAPI);
APIRouter.post("/login", handleLogin);

export default APIRouter;
