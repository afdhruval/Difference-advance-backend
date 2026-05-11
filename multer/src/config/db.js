const mongoose = require("mongoose")
const config = require("./config")


function mongodb() {
    mongoose.connect(config.MONGO_URI)
        .then(() => {
            console.log("database connected");
        })
}

module.exports = mongodb