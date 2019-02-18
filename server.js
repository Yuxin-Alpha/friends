const express = require("express");
const app = express();
const mongoose = require("mongoose");

const port = process.env.PORT || 5000;
const dbUrl = "mongodb://127.0.0.1:27017/friends";
mongoose
  .connect(dbUrl, {
    useNewUrlParser: true
  })
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch(err => {
    console.log(err);
  });

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(port, () => {
  console.log(`Server is runing on pport ${port}`);
});
