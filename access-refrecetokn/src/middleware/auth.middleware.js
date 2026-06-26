import jwt from "jsonwebtoken";
import config from "../config/config.js";
import userMOdel from "../models/user.model.js";

const authMiddleware = async (req, res, next) => {
  try {
    const accessToken =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    if (!accessToken) {
      return res.status(401).json({
        message: "Unauthorized access: No access token provided",
      });
    }

    const decoded = jwt.verify(accessToken, config.JWT_Access_Token);
    
    if (!decoded) {
      return res.status(401).json({
        message: "Unauthorized access: Invalid token",
      });
    }

    const user = await userMOdel.findById(decoded.id);

    if (!user) {
      return res.status(401).json({
        message: "Unauthorized access: User not found",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Unauthorized access: Invalid or expired token",
      error: error.message,
    });
  }
};

export default authMiddleware;
