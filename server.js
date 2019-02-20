const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport")
const users = require("./routes/api/users");
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

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());

require("./config/passport")(passport);

app.use("/api/users", users);


app.listen(port, () => {
  console.log(`Server is runing on pport ${port}`);
});
