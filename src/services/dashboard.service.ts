import { prisma } from "../config/client";

const getCountInforDashboard = async () => {
  const countUser = await prisma.user.count();
  const countProduct = await prisma.product.count();
  const countOrder = await prisma.order.count();
  const infor = { countUser, countProduct, countOrder };

  return infor;
};

export { getCountInforDashboard };
