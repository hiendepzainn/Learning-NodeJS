import { error } from "console";
import getConnection from "../config/database";
import { PrismaClient } from "@prisma/client";
import { prisma } from "../config/client";

const handleCreateUser = async (
  fullName: string,
  email: string,
  address: string
) => {
  //insert to DB

  await prisma.user.create({
    data: {
      fullName: fullName,
      username: email,
      address: address,
      password: "",
      accountType: "",
      avatar: "",
      phone: "",
    },
  });
};

const getAllUsers = async () => {
  const listUsers = await prisma.user.findMany();
  return listUsers;
};

const handleDeleteUser = async (id: number) => {
  await prisma.user.delete({
    where: {
      id: id,
    },
  });
};

const getUserByID = async (id: number) => {
  const user = await prisma.user.findUnique({
    where: {
      id: id,
    },
  });
  return user;
};
const handleUpdateUser = async (
  id: number,
  name: string,
  email: string,
  address: string
) => {
  await prisma.user.update({
    where: {
      id: id,
    },
    data: {
      fullName: name,
      username: email,
      address: address,
    },
  });
};

export {
  handleCreateUser,
  getAllUsers,
  handleDeleteUser,
  getUserByID,
  handleUpdateUser,
};
