import { prisma } from "./client";

const initDatabase = async () => {
  const countUsers = await prisma.user.count();
  if (countUsers === 0) {
    await prisma.user.createMany({
      data: [
        {
          username: "hien@gmail.com",
          password: "123456",
          accountType: "SYSTEM",
        },
        {
          username: "admin@gmail.com",
          password: "123456",
          accountType: "SYSTEM",
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
