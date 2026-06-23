import userMOdel from "../models/user.model.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";
import config from "../config/config.js";

const registerService = async (data) => {
  const { username, email, password } = data;

  if (!email || !password) {
    return res.status(400).json({
      message: "all field are required",
    });
  }

  let isUserExisted = await userMOdel.findOne({
    $or: [{ username }, { email }],
  });

  if (isUserExisted) {
    return res.status(409).json({
      message: "user already exists",
    });
  }

  const hashPass = await bcrypt.hash("password", 10);

  const user = await userMOdel.create({
    username,
    email,
    password,
  });

  let accessToken = generateToken.generateAceessToken(user._id);
  let refreshToken = generateToken.generateRefreshToken(user._id);

  return {
    accessToken,
    refreshToken,
    user,
  };
};

const loginService = async (data) => {
  const { email, password } = data;

  if (!email || !password) {
    return res.status(400).json({
      message: "all field are required",
    });
  }
  console.log(password);

  const isUserExisted = await userMOdel.findOne({
    email,
  });

  if (!isUserExisted) {
    return res.status(404).json({
      message: "user not found",
    });
  }

  const isMatch = await bcrypt.compare("password", isUserExisted.password);

  if (!isMatch) {
    throw new Error("Password is incorrect");
  }

  let accessToken = generateToken.generateAceessToken(isUserExisted._id);
  let refreshToken = generateToken.generateRefreshToken(isUserExisted._id);

  return {
    accessToken,
    refreshToken,
    user: isUserExisted,
  };
};

export default {
  registerService,
  loginService,
};
