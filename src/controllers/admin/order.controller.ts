import { Request, Response } from "express";
import {
  getOrderDetailsWithProductByOrderID,
  getOrdersWithOrderDetailWithProductByUserID,
} from "../../services/order.service";

const getViewOrder = async (req: Request, res: Response) => {
  const orderID: number = Number(req.params.id);
  const orderDetails = await getOrderDetailsWithProductByOrderID(orderID);
  console.log(orderDetails);
  res.render("admin/order/details.ejs", {
    orderID: orderID,
    orderDetails: orderDetails,
  });
};

const getOrderHistoryPage = async (req: Request, res: Response) => {
  const user = req.user as any;
  if (!user) {
    res.redirect("/login");
  }

  const userID = user.id;
  const orders = (await getOrdersWithOrderDetailWithProductByUserID(
    userID
  )) as any;
  res.render("client/order/history.ejs", {
    orders: orders ?? [],
  });
};

export { getViewOrder, getOrderHistoryPage };
