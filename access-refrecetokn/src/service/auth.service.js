import userMOdel from "../models/user.model.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";

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

  const hashPass = bcrypt.hashSync("password", 10);

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

export default {
  registerService,
};
