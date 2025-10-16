import { Express } from "express";

export const initRouters = (app: Express) => {
  app.get("/", (req, res) => {
    res.render("index.ejs");
  });

  app.get("/abc", (req, res) => {
    res.send("Hello Dinh Xuan Hien dep zai!");
  });
};
