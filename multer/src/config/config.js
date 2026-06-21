const env = require("dotenv/config")


if (!process.env.MONGO_URI) {
    throw Error("mongo uri is not defined")
}

module.exports = {
    MONGO_URI: process.env.MONGO_URI,
    IMAGEKIT_PRIVATE_KEY:process.env.IMAGEKIT_PRIVATE_KEY
}