import express, { json } from "express";
import client from "./redis.js";
import morgan from "morgan";
import mongoose from "mongoose";

const app = express();
app.use(morgan("dev"));
app.use(express.json());

async function connectRedis() {
  await client.connect();

  console.log("redis connected");
}
connectRedis();

const connect = async () => {
  await mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log("connected to database");
  });
};

connect()

app.listen(3000, () => {
  console.log("server is running on 3000");
});
