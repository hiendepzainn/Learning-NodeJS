import { Request, Response } from "express";
import { getAccessToken, getAllUser } from "../../services/api/api.service";

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

export { getAllUsersAPI, handleLogin };
