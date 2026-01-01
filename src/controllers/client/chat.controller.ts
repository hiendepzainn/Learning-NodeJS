import { Request, Response } from "express";
import { getCurrentTime } from "../../services/chat.service";

const getChatPage = async (req: Request, res: Response) => {
  const startTime = getCurrentTime();
  res.render("client/chatbot/chat.ejs", {
    startTime,
  });
};

export { getChatPage };
