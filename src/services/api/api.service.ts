import { prisma } from "../../config/client";
import { comparePassword } from "../user.service";
import jwt from "jsonwebtoken";

const getAllUser = async () => {
  const users = await prisma.user.findMany();
  return users;
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
    id: 27,
    name: "Dinh Xuan Hien",
    role: "ADMIN",
  };
  const secret = "Step on no pets";
  const access_token = jwt.sign(payload, secret, {
    expiresIn: "1d",
  });

  return access_token;
};

export { getAllUser, getAccessToken };
