import userMOdel from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import authService from "../service/auth.service.js";
import generateToken from "../utils/generateToken.js";

const register = async (req, res) => {
  let { accessToken, refreshToken, user } = await authService.registerService(
    req.body,
  );

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    sameSite: "lax",
    secure: false,
    maxAge: 10 * 60 * 1000,
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    sameSite: "lax",
    secure: false,
    maxAge: 24 * 60 * 60 * 1000,
  });

  return res.status(201).json({
    message: "use registered successfully",
    user,
  });
};

const login = async (req, res) => {
  const { accessToken, refreshToken, user } = await authService.loginService(
    req.body,
  );

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    sameSite: "lax",
    secure: false,
    maxAge: 10 * 60 * 1000,
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    sameSite: "lax",
    secure: false,
    maxAge: 24 * 60 * 60 * 1000,
  });

  return res.status(201).json({
    message: "user loggedIn",
    user,
  });
};

const generateAcessToken = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return res.status(401).json({
      message: "Unauthorized : No refresh token provided",
    });
  }

  let accessToken = await authService.generateAccesTokenService(refreshToken);

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    sameSite: "lax",
    secure: false,
    maxAge: 10 * 60 * 1000,
  });

  return res.status(200).json({
    message: "Access token generated",
  });
};

export default {
  register,
  login,
  generateAcessToken
};
