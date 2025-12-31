import { Request, Response } from "express";

const getChatPage = async (req: Request, res: Response) => {
  res.render("client/chatbot/chat.ejs");
};

export { getChatPage };
