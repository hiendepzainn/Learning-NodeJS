import { ProductCode, VnpLocale, dateFormat } from "vnpay";
import { VNPay } from "vnpay";
import { prisma } from "../config/client";

const createURL = (orderID) => {
  const vnpay = new VNPay({
    secureSecret: "E4H8DFZID84JSB1IZ9K5W074HQMOHDJK",
    tmnCode: "5YOHHQJO",
    testMode: true,
  });

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  const paymentUrl = vnpay.buildPaymentUrl({
    vnp_Amount: 2000000,
    vnp_IpAddr: "127.0.0.1",
    vnp_TxnRef: orderID,
    vnp_OrderInfo: "Thanh toan don hang 123456",
    vnp_OrderType: ProductCode.Other,
    vnp_ReturnUrl: "http://localhost:8000/vnpay-return",
    vnp_Locale: VnpLocale.VN, // 'vn' hoặc 'en'
    vnp_CreateDate: dateFormat(new Date()), // tùy chọn, mặc định là thời gian hiện tại
    vnp_ExpireDate: dateFormat(tomorrow), // tùy chọn
  });

  return paymentUrl;
};

// change unpaid -> paid
const changeStatus = async (orderID) => {
  await prisma.order.update({
    where: {
      id: orderID,
    },
    data: {
      paymentStatus: "PAID",
    },
  });
};

export { createURL, changeStatus };
