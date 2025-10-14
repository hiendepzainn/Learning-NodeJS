const express = require("express");
const app = express();

const PORT = 1410;

app.get("/", (req, res) => {
  res.send("Hello World update!");
});

app.get("/abc", (req, res) => {
  res.send("Hello Dinh Xuan Hien dep zai!");
});

app.listen(PORT, () => {
  console.log(`This app is running at port: ${PORT}`);
});
