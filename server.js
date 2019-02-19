const express = require("express");
const mongoose = require("mongoose");
const users = require("./routes/api/users");
const bodyParser = require("body-parser");
const port = process.env.PORT || 5000;
const dbUrl = "mongodb://127.0.0.1:27017/friends";

const app = express();

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

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use("/api/users", users);
app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(port, () => {
  console.log(`Server is runing on pport ${port}`);
});
