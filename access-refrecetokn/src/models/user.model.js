import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  username: {
    type: String,
  },
  email: {
    type: String,
    required: [true, "email is required"],
  },
  password: {
    type: String,
  },
});


const userMOdel = mongoose.model("usress",userSchema)


export default userMOdel