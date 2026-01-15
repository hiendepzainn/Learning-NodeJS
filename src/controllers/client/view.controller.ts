import { Request, Response } from "express";

const getViewProduct = async (req: Request, res: Response) => {
  res.render("client/view/view.ejs");
};

export { getViewProduct };
