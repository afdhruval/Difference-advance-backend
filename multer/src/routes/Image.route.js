const express = require("express")
const imageRouter = express.Router()
const imageController = require("../controller/Image.controller")
const multer = require("multer")
const path = require("path")
const fs = require("fs")

if (!fs.existsSync("./upload")) {
    fs.mkdirSync("./upload")
}

const upload = multer({ dest: 'upload/' });

imageRouter.get("/", imageController.showImage)


imageRouter.post("/upload", upload.single("image"), imageController.uploadImage)

module.exports = imageRouter
