// Package Imports
const ejs = require("ejs")
const path = require("path")
const express = require("express")



// Locals Imports
const app = require("./src/app")
const imageRoute = require("./src/routes/Image.route")

// mondo db connect
const mongodb = require("./src/config/db")
mongodb()


// routes
app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "src/views"));
app.use("/", imageRoute)
app.use("/upload", express.static(path.join(__dirname, "upload")))


app.listen(3000, () => {
    console.log("server is running on 3000");
})
