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
  return res.render("client/home/show.ejs");
};

const getCreateUserPage = async (req: Request, res: Response) => {
  const roles = await getAllRoles();
  return res.render("admin/user/create.ejs", {
    listRoles: roles,
  });
};

const postCreateUser = async (req: Request, res: Response) => {
  const { fullName, username, phone, role, address } = req.body;

  const file = req.file;
  const avatar = file ? file.filename : "";

  await handleCreateUser(fullName, username, phone, role, avatar, address);

  res.redirect("/admin/user");
};

const postDeleteUser = async (req: Request, res: Response) => {
  const id: number = Number(req.params.id);

  await handleDeleteUser(id);
  return res.redirect("/admin/user");
};

const getViewUser = async (req: Request, res: Response) => {
  const roles = await getAllRoles();
  const id: number = Number(req.params.id);

  const user = await getUserByID(id);
  return res.render("admin/user/details.ejs", {
    user: user,
    listRoles: roles,
  });
};

const postUpdateUser = async (req: Request, res: Response) => {
  const { fullName, phone, role, address } = req.body;
  const id: number = Number(req.params.id);
  let avatar = req.file ? req.file.filename : "";

  if (!avatar) {
    const user = await getUserByID(id);
    avatar = user.avatar;
  }

  await handleUpdateUser(id, fullName, phone, role, address, avatar);

  return res.redirect("/admin/user");
};

export {
  getHomePage,
  getCreateUserPage,
  postCreateUser,
  postDeleteUser,
  getViewUser,
  postUpdateUser,
};
