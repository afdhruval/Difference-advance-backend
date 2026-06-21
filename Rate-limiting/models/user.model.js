import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  username: String,
  password: String,
});

const userModel = mongoose.model("redisuser", userSchema);

export default userModel
