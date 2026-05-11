const imageModel = require("../models/imageModel");

const showImage = async (req, res) => {
  const images = await imageModel.find();
  res.render("index", { images });
};

const uploadImage = async (req, res) => {
  const image = await imageModel.create({
    image: req.file.filename,
  });

  res.redirect("/");
};

module.exports = {
  showImage,
  uploadImage,
};
