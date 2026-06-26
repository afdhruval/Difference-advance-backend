import express from "express";
import authMiddleware from "../middleware/auth.middleware.js"

const homeRouter = express.Router();

homeRouter.get("/", authMiddleware, (req, res) => {
  return res.status(200).json({
    message: "Home fetched",
  });
});

export default homeRouter;
