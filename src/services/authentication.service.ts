import { prisma } from "../config/client";
import { ACCOUNT_TYPE } from "../config/constant";
import { hashPassword } from "./user.service";

const isExistInDatabase = async (email) => {
  const user = await prisma.user.findUnique({
    where: {
      username: email,
    },
  });

  if (user) {
    return true;
  }
  return false;
};

const insertUserToDatabase = async (fullName, email, password) => {
  await prisma.user.create({
    data: {
      fullName: fullName,
      username: email,
      password: await hashPassword(password),
      accountType: ACCOUNT_TYPE.SYSTEM,
      roleID: 2,
    },
  });
};

export { isExistInDatabase, insertUserToDatabase };
