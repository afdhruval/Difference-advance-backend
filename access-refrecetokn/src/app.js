import express from "express";
import connectTOdb from "./config/db.js";

const app = express();
connectTOdb();
app.use(express.json());

export default app;
