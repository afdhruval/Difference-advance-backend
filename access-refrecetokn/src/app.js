import express from "express";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import connectTOdb from "./config/db.js";
import authRouter from "./routes/auth.routes.js";
import homeRouter from "./routes/home.routes.js";

const app = express();
connectTOdb();

app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

app.use("/api/auth", authRouter);
app.use("/api/home", homeRouter);

export default app;
