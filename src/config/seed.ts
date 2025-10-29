import { hashPassword } from "../services/user.service";
import { prisma } from "./client";
import { ACCOUNT_TYPE } from "./constant";

const initDatabase = async () => {
  const countUsers = await prisma.user.count();
  if (countUsers === 0) {
    await prisma.user.createMany({
      data: [
        {
          fullName: "Dinh Xuan Hien",
          username: "hien@gmail.com",
          password: await hashPassword("123456"),
          accountType: ACCOUNT_TYPE.SYSTEM,
          roleID: 1,
        },
        {
          fullName: "ADMIN",
          username: "admin@gmail.com",
          password: await hashPassword("123456"),
          accountType: ACCOUNT_TYPE.SYSTEM,
          roleID: 1,
        },
      ],
    });
  } else {
    console.log("Already init Users...");
  }

  const countRoles = await prisma.role.count();
  if (countRoles === 0) {
    await prisma.role.createMany({
      data: [
        {
          name: "ADMIN",
          description: "Admin thì full quyền",
        },
        {
          name: "USER",
          description: "User thông thường",
        },
      ],
    });
  } else {
    console.log("Already init Roles...");
  }
};

export default initDatabase;
