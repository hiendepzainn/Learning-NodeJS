import express from "express";
import "dotenv/config";
const app = express();

const PORT = process.env.PORT || 8888;

app.get("/", (req, res) => {
  res.send("Hello World update!");
});

app.get("/abc", (req, res) => {
  res.send("Hello Dinh Xuan Hien dep zai!");
});

app.listen(PORT, () => {
  console.log(`This app is running at port: ${PORT}`);
  console.log("My env: ", process.env.PORT);
});
