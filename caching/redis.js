import "dotenv/config";
import { createClient } from "redis";

const client = createClient({
  url: process.env.REDIS_URI,
});

client.on("error", (err) => {
  console.log("redis error : ", err);
});

export default client;
