import { Router } from "express";
import { getAllUsersAPI } from "../controllers/api/api.controller";

const APIRouter = Router();

APIRouter.get("/users", getAllUsersAPI);

export default APIRouter;
