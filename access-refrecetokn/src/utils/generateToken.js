import jwt from "jsonwebtoken";
import config from "../config/config.js";

const generateAceessToken = (userId) => {
  return jwt.sign({ id: userId }, config.JWT_Access_Token, {
    expiresIn: "10m",
  });
};

const generateRefreshToken = (userId) => {
  return jwt.sign({ id: userId }, config.JWT_Refresh_Token, {
    expiresIn: "1d",
  });
};

export default {
  generateAceessToken,
  generateRefreshToken,
};
