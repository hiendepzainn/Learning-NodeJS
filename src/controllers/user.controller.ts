import { Request, Response } from "express";
import {
  getAllRoles,
  getAllUsers,
  getUserByID,
  handleCreateUser,
  handleDeleteUser,
  handleUpdateUser,
} from "../services/user.service";
import getConnection from "../config/database";

const getHomePage = async (req: Request, res: Response) => {
  // get data
  const users = await getAllUsers();
  return res.render("home.ejs", {
    listUsers: users,
  });
};

const getCreateUserPage = async (req: Request, res: Response) => {
  const roles = await getAllRoles();
  return res.render("admin/user/create.ejs", {
    listRoles: roles,
  });
};

const postCreateUser = async (req: Request, res: Response) => {
  // console.log(req.body);
  // const { fullName, username, phone, role, address } = req.body;

  //handle create-user
  // await handleCreateUser(fullName, email, address);

  // return res.redirect("/admin/user");
  console.log(req.file);
  console.log(req.body);
  res.send("ok");
};

const postDeleteUser = async (req: Request, res: Response) => {
  const id: number = Number(req.params.id);

  await handleDeleteUser(id);
  return res.redirect("/");
};

const getViewUser = async (req: Request, res: Response) => {
  const id: number = Number(req.params.id);

  const user = await getUserByID(id);
  return res.render("view-details.ejs", {
    user: user,
  });
};

const postUpdateUser = async (req: Request, res: Response) => {
  const { fullName, email, address } = req.body;
  const id: number = Number(req.params.id);

  await handleUpdateUser(id, fullName, email, address);

  return res.redirect("/");
};

export {
  getHomePage,
  getCreateUserPage,
  postCreateUser,
  postDeleteUser,
  getViewUser,
  postUpdateUser,
};
