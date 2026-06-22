import userMOdel from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import authService from "../service/auth.service.js";
import generateToken from "../utils/generateToken.js";

const register = async (req, res) => {
  let { accessToken, refreshToken, user } = await authService.registerService(
    req.body,
  );

  const accesssToken = generateToken.generateAccessToken(user._id);
  const RefreshToken = generateToken.generateRefreshToken(user._id);

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
