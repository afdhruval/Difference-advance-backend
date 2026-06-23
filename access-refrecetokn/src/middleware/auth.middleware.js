import jwt from "jsonwebtoken";
import config from "../config/config.js";
import userMOdel from "../models/user.model.js";

const authMiddleware = async (req, res) => {
  try {
    const accesstoken = res.cookie.accesstoken;

    if (!accesstoken) {
      return res.status(409).json({
        message: "Unauthorized accesss",
      });

      const decoded = await jwt.verify(accesstoken, config.JWT_Access_Token);

      if (!decoded)
        return res.status(409).json({
          message: "Unauthorized accesss",
        });

      const user = await userMOdel.findById(decoded._id);

      req.user = user;

      next();
    }
  } catch (error) {
    throw new Error(error);
  }
};

export default authMiddleware;
