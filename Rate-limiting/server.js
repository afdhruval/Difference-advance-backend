import "dotenv/config";
import express from "express";
import morgan from "morgan";
import mongoose from "mongoose";
import Redis from "ioredis";
import userModel from "./models/user.model.js";
import rateLimit from "express-rate-limit";

const connectTOMOngodb = async () => {
  mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log("connected to database");
  });
};

connectTOMOngodb();

const redis = new Redis(process.env.REDIS_URI);

redis.once("ready", () => {
  console.log("connected to redis");
});

const app = express();
app.use(morgan("dev"));
app.use(express.json());

const globalRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Too many requests from this IP, please try again after 15 minutes",
  statusCode: 429,
  standardHeaders: true,
  legacyHeaders: false,
});

app.get("/userr", async (req, res) => {
  const userFromCache = await redis.get("user ");

  if (userFromCache) {
    return res.status(200).json({
      message: "data fetched from cache",
      user: JSON.parse(userFromCache),
    });
  }

  const user = await userModel.find();

  await redis.set("user", JSON.stringify(user), "EX", 60 * 60 * 24);

  return res.status(200).json({
    message: "data fetched succeessfullly",
    user,
  });
});

app.post("/user", async (req, res) => {
  const { password, username } = req.body;

  const user = await userModel.create({
    username,
    password,
  });

  return res.status(201).json({
    message: "User created successfully",
    user,
  });
});

app.get("/", async (req, res) => {
  let sum = 0;
  for (let i = 0; i < 1000000000; i++) {
    sum += i;
  }
  return res.status(200).json({
    message: "Hello World",
    sum,
  });
});

app.listen(3000, () => {
  console.log("connected to database");
});
