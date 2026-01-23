import { prisma } from "../../config/client";
import { comparePassword } from "../user.service";
import jwt from "jsonwebtoken";
import "dotenv/config";
const getAllUser = async () => {
  const users = await prisma.user.findMany();
  return users;
};

const getProductByID = async (id) => {
  const product = await prisma.product.findUnique({
    where: {
      id: id,
    },
  });
  return product;
};

const getAccessToken = async (username: string, password: string) => {
  const user = await prisma.user.findUnique({
    where: {
      username: username,
    },
  });

  if (!user) {
    throw new Error(`Username ${username} is not found!`);
  }

  const result = await comparePassword(password, user.password);
  if (!result) {
    throw new Error(`Invalid Password!`);
  }

  const payload = {
    id: user.id,
    username: user.username,
    fullName: user.fullName,
    address: user.address,
    phone: user.phone,
    accountType: user.accountType,
    avatar: user.avatar,
    roleID: user.roleID,
  };
  const secret = process.env.JWT_SECRET;
  const access_token = jwt.sign(payload, secret, {
    expiresIn: "1d",
  });

  return access_token;
};

export { getAllUser, getAccessToken, getProductByID };
