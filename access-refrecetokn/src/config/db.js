import mongoose from "mongoose";
import config from "./config.js";

const connectTOdb = () => {
  try {
    mongoose.connect(config.MONGO_URI).then(() => {
      console.log("connected to databse");
    });
  } catch (error) {
    console.log("mongodb got an error", error);
  }
};


export default connectTOdb