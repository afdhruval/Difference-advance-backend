const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
  image: {
    type: String,
  },
});

const imageModel = mongoose.model("IMAGE", imageSchema);

module.exports = imageModel;
