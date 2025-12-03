import { Request, Response } from "express";
import { getAllUser } from "../../services/api/api.service";

const getAllUsersAPI = async (req: Request, res: Response) => {
  const users = await getAllUser();

  res.status(200).json({
    data: users,
  });
};

export { getAllUsersAPI };
