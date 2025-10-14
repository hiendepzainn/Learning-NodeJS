import express from "express";
import "dotenv/config";
const app = express();

const PORT = process.env.PORT || 8888;

app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.get("/abc", (req, res) => {
  res.send("Hello Dinh Xuan Hien dep zai!");
});

app.listen(PORT, () => {
  console.log(`This app is running at port: ${PORT}`);
  console.log("URL view engine:", __dirname + "/views");
});
