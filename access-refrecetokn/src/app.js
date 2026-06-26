import express from "express";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import connectTOdb from "./config/db.js";
import authRouter from "./routes/auth.routes.js";
import homeRouter from "./routes/home.routes.js";
import cors from "cors";

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
connectTOdb();

app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

app.use("/api/auth", authRouter);
app.use("/api/home", homeRouter);

export default app;
