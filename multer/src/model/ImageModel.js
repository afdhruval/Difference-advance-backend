const mongoose = require("mongoose")

const imageSchema = mongoose.Schema({
    imageUrl: {
        type: String,
        required: true
    },
    fileId: {
        type: String,
        required: true
    }
})

const imageModel = mongoose.model("MulterImages", imageSchema)

module.exports = imageModel