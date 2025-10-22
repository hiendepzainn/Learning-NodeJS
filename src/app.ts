import express from "express";
import "dotenv/config";
import { initRouters } from "./routes/web";
import getConnection from "./config/database";
import initDatabase from "./config/seed";
const app = express();

const PORT = process.env.PORT || 8888;

app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

//config req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//config static files
app.use(express.static("public"));

//config routers
initRouters(app);

//seeding data
initDatabase();

app.listen(PORT, () => {
  console.log(`This app is running at port: ${PORT}`);
});
