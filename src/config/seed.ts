import { prisma } from "./client";

const initDatabase = async () => {
  const countRecord = await prisma.user.count();
  if (countRecord === 0) {
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
    console.log("Already init...");
  }
};

export default initDatabase;
