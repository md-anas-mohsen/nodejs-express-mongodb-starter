const express = require("express");
const helmet = require("helmet");
const app = express();

const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const path = require("path");

const errorMiddleware = require("./middlewares/errors");

app.use(helmet({ contentSecurityPolicy: false }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(fileUpload());

if (process.env.NODE_ENV === "PRODUCTION") {
  app.use("/", express.static(path.join(__dirname, "../frontend/build")));
  app.use("/admin", express.static(path.join(__dirname, "../admin/build")));

  app.get("/*", function (req, res) {
    res.sendFile(path.join(__dirname, "../frontend/build", "index.html"));
  });
  app.get("/admin/*", function (req, res) {
    res.sendFile(path.join(__dirname, "../admin/build", "index.html"));
  });
}

app.use(errorMiddleware);

module.exports = app;
