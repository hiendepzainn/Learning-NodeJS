import { prisma } from "../config/client";
import { ACCOUNT_TYPE, PAGE_SIZE } from "../config/constant";

import bcrypt from "bcrypt";
const saltRounds = 10;

export const hashPassword = async (password: string) => {
  return await bcrypt.hash(password, saltRounds);
};

const comparePassword = async (plainText: string, hashPassword: string) => {
  return await bcrypt.compare(plainText, hashPassword);
};

const handleCreateUser = async (
  fullName: string,
  username: string,
  phone: string,
  role: string,
  avatar: string,
  address: string
) => {
  //insert to DB

  await prisma.user.create({
    data: {
      fullName: fullName,
      username: username,
      phone: phone,
      address: address,
      password: await hashPassword("12234567"),
      accountType: ACCOUNT_TYPE.SYSTEM,
      avatar: avatar,
      roleID: +role,
    },
  });
};

const getAllUsers = async () => {
  const listUsers = await prisma.user.findMany();
  return listUsers;
};

const getAllRoles = async () => {
  const listRoles = await prisma.role.findMany();
  return listRoles;
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

const getUserAndRoleByID = async (id: number) => {
  const user = await prisma.user.findUnique({
    where: {
      id: id,
    },
    include: {
      role: true,
    },
  });
  return user;
};

const handleUpdateUser = async (
  id: number,
  name: string,
  phone: string,
  role: string,
  address: string,
  avatar: string
) => {
  await prisma.user.update({
    where: {
      id: id,
    },
    data: {
      fullName: name,
      phone: phone,
      roleID: Number(role),
      address: address,
      avatar: avatar,
    },
  });
};

const getUsersByPage = async (page: number) => {
  const users = prisma.user.findMany({
    skip: (page - 1) * PAGE_SIZE,
    take: PAGE_SIZE,
  });

  return users;
};

const getTotalPagesUser = async () => {
  const countUser = await prisma.user.count();
  const totalPages = Math.ceil(countUser / PAGE_SIZE);

  return totalPages;
};

export {
  handleCreateUser,
  getAllUsers,
  handleDeleteUser,
  getUserByID,
  handleUpdateUser,
  getAllRoles,
  comparePassword,
  getUserAndRoleByID,
  getUsersByPage,
  getTotalPagesUser,
};
