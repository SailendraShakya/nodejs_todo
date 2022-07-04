require("dotenv").config();
require("./config/database").connect();
const express = require("express");

const auth = require("./middleware/auth");

const authentication = require("./controller/authentication");
const todo = require("./controller/todo");

const app = express();

app.use(express.json({ limit: "50mb" }));

//user
app.use("/user", authentication);

//todo
app.use("/todo", auth, todo);

app.get("/welcome", auth, (req, res) => {
  res.status(200).send("Welcome 🙌 ");
});

// This should be the last route else any after it won't work
app.use("*", (req, res) => {
  res.status(404).json({
    success: "false",
    message: "Page not found",
    error: {
      statusCode: 404,
      message: "You reached a route that is not defined on this server",
    },
  });
});

module.exports = app;
