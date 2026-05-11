const express = require("express");
const imageRoute = express.Router();
const multer = require("multer");
const path = require("path");
const imgController = require("../controller/imageController");

const storage = multer.diskStorage({
  destination: "./uploads",
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

imageRoute.get("/", imgController.showImage);

imageRoute.post ("/upload", upload.single("image"), imgController.uploadImage);

module.exports = imageRoute;
