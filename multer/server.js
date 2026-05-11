const express = require("express");
const dotenv = require("dotenv")
dotenv.config()
const app = require("./app");
const MONGO = require("./config/config");
const ejs = require("ejs");
const path = require("path");
const imageRoute = require("./routes/imageroute");

MONGO();

app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/", imageRoute);

app.listen(3000, () => {
  console.log("server is runnig on 3000");
});
