import { Request, Response } from "express";
import { getOrderDetailsWithProductByOrderID } from "../../services/order.service";

const getViewOrder = async (req: Request, res: Response) => {
  const orderID: number = Number(req.params.id);
  const orderDetails = await getOrderDetailsWithProductByOrderID(orderID);
  console.log(orderDetails);
  res.render("admin/order/details.ejs", {
    orderID: orderID,
    orderDetails: orderDetails,
  });
};

export { getViewOrder };
