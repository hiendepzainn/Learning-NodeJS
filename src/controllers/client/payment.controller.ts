import { Request, Response } from "express";
import {
  deleteCartDetailAndCart,
  getCartFromUserID,
} from "../../services/cart.service";
import { changeStatus } from "../../services/payment.service";

const getResultPayment = async (req: Request, res: Response) => {
  const response = req.query;
  if (response.vnp_ResponseCode == "00") {
    // Xóa CartDetail - Cart
    const user = req.user as any;
    const userID = user.id;
    const cart = await getCartFromUserID(userID);
    const cartID = cart.id;
    await deleteCartDetailAndCart(cartID);

    // Lấy ref để query order từ DB, đổi unpaid -> paid
    changeStatus(Number(response.vnp_TxnRef));

    // Hiển thị thông báo: THÀNH CÔNG
    res.render("client/cart/thankyou.ejs");
  } else {
    // Hiển thị thông báo: THẤT BẠI
    res.render("client/cart/failed.ejs");
  }
};

export { getResultPayment };
