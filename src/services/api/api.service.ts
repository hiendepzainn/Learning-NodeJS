import { prisma } from "../../config/client";

const getAllUser = async () => {
  const users = await prisma.user.findMany();
  return users;
};

export { getAllUser };
