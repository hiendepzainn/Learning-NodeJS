import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

const checkValidJWT = (req: Request, res: Response, next: NextFunction) => {
  // get TOKEN from REQ.HEADERS
  const token = req.headers.authorization?.split(" ")[1];
  console.log(token);

  const secret = process.env.JWT_SECRET;
  // verify TOKEN
  try {
    const decodedData = jwt.verify(token, secret);
    // assign User Data to req.user
    req.user = decodedData;

    next();
  } catch (error) {
    res.status(401).json({
      data: null,
      message: "Token không hợp lệ hoặc hết hạn",
    });
  }
};

export { checkValidJWT };
