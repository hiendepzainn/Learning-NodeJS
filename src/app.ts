import express from "express";
import "dotenv/config";
import { initRouters } from "./routes/web";
const app = express();

const PORT = process.env.PORT || 8888;

app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

//config routers
initRouters(app);

//config static files
app.use(express.static("public"));

app.listen(PORT, () => {
  console.log(`This app is running at port: ${PORT}`);
  console.log("URL view engine:", __dirname + "/views");
});
