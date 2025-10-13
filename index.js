const express = require("express");
const app = express();

const PORT = 1410;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/abc", (req, res) => {
  res.send("Hello Dinh Xuan Hien!");
});

app.listen(PORT, () => {
  console.log(`This app is running at port: ${PORT}`);
});
