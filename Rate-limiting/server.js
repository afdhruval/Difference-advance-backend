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

app.get("/test", async (req, res) => {
  const key = `rate_limit:${req.ip}`;

  const requests = await redis.incr(key);

  if (requests === 1) {
    await redis.expire(key, 60);
  }

  if (requests > 5) {
    const ttl = await redis.ttl(key);

    return res.status(429).json({
      message: "Too Many Requests",
      retryAfter: ttl,
    });
  }

  return res.status(200).json({
    message: "Request Allowed",
    count: requests,
  });
});

app.listen(3000, () => {
  console.log("connected to database");
});
