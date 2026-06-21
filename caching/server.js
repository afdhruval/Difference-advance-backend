import express, { json } from "express";
import client from "./redis.js";
import morgan from "morgan";
import mongoose from "mongoose";
import userModel from "./models/user.model.js";

const app = express();
app.use(morgan("dev"));

app.use(express.json());

function connections() {
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

  connect();

  app.listen(3000, () => {
    console.log("server is running on 3000");
  });
}

app.post("/user", async (req, res) => {
  const { username, password } = req.body;

  const user = await userModel.create({
    username,
    password,
  });
  return res.status(200).json({
    message: "success",
    user,
  });
});

app.get("/user", async (req, res) => {
  const cacheResult = await client.get("user");
  if (cacheResult) {
    return res.status(200).json({
      message: "data come from cache",
      data: JSON.parse(cacheResult),
    });
  }

  const user = await userModel.find();

  await client.set("user", JSON.stringify(user), {
    EX : 10,
  });

  return res.status(200).json({
    message: "success",
    data: user,
  });
});

connections();
