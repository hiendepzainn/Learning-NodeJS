import { Request, Response } from "express";

const get404Page = (req: Request, res: Response) => {
  res.render("status/404.ejs");
};

export { get404Page };
