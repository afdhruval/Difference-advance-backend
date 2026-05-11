const mongoose = require("mongoose");

const connectTODB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("connected to database");
  } catch (error) {
    console.error("Database connection failed:", error.message);
    process.exit(1);
  }
};

module.exports = connectTODB;
