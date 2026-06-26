import express from "express";
import authController from "../controller/auth.controller.js";
const authRouter = express.Router();

authRouter.post("/register", authController.register);

authRouter.get("/get-accessToken", authController.generateAcessToken) 

authRouter.post("/login", authController.login);

export default authRouter;
