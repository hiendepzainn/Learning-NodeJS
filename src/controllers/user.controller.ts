import { Request, Response } from "express";
import {
  getAllUsers,
  handleCreateUser,
  handleDeleteUser,
} from "../services/user.service";
import getConnection from "../config/database";

const getHomePage = async (req: Request, res: Response) => {
  // get data
  const users = await getAllUsers();
  return res.render("home.ejs", {
    listUsers: users,
  });
};

const getCreateUserPage = (req: Request, res: Response) => {
  return res.render("create-user.ejs");
};

const postCreateUser = async (req: Request, res: Response) => {
  const { fullName, email, address } = req.body;

  //handle create-user
  await handleCreateUser(fullName, email, address);

  return res.redirect("/");
};

const postDeleteUser = async (req: Request, res: Response) => {
  const id: number = Number(req.params.id);

  await handleDeleteUser(id);
  return res.redirect("/");
};

export { getHomePage, getCreateUserPage, postCreateUser, postDeleteUser };
