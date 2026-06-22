import "dotenv/config";

export default {
  PORT: process.env.PORT || 4000,
  MONGO_URI: process.env.MONGO_URI,
  JWT_Access_Token: process.env.JWT_Access_Token,
  JWT_Refresh_Token: process.env.JWT_Refresh_Token,
};
