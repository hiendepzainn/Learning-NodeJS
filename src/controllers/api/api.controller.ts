import { Request, Response } from "express";
import {
  getAccessToken,
  getAllUser,
  getProductByID,
} from "../../services/api/api.service";

const getAllUsersAPI = async (req: Request, res: Response) => {
  const users = await getAllUser();
  console.log(req.user);

  res.status(200).json({
    data: users,
  });
};

const handleLogin = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    const access_token = await getAccessToken(username, password);
    res.status(200).json({
      data: {
        access_token,
      },
    });
  } catch (error) {
    res.status(401).json({
      data: null,
      message: error.message,
    });
  }
};

const getAccount = (req: Request, res: Response) => {
  // DATA at REQ.USER exist already after Run jwt.middleware.ts
  const user = req.user;

  res.status(200).json({
    data: {
      user,
    },
  });
};

const getProductsByListID = async (req: Request, res: Response) => {
  const { listID } = req.body;
  console.log(listID);
  const listProduct = [];

  for (const id of listID) {
    const product = await getProductByID(id);
    listProduct.push(product);
  }

  res.status(200).json({
    data: {
      listProduct,
    },
  });
};

export { getAllUsersAPI, handleLogin, getAccount, getProductsByListID };
