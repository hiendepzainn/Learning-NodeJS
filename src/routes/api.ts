import { Router } from "express";
import { getAllUsersAPI, handleLogin } from "../controllers/api/api.controller";

const APIRouter = Router();

APIRouter.get("/users", getAllUsersAPI);
APIRouter.post("/login", handleLogin);

export default APIRouter;
