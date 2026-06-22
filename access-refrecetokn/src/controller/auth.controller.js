import userMOdel from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "../config/config.js";
import authService from "../service/auth.service.js";
const register = async (req, res) => {
  let { accessToken, refreshToken, user } = await authService.registerService(
    req.body,
  );

  return res.status(201).json({
    message: "use registered successfully",
    user,
  });
};

const login = async (req, res) => {};

export default {
  register,
  login,
};
