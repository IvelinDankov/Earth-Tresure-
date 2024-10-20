import { Schema, model, Types } from "mongoose";

import bcrypt from "bcrypt";

const SALT = 10;

const userSchema = new Schema({
  email: {
    type: String,
    required: [true, "Email is required!"],
    minLength: [10, "Email should be at lease 10 character long"]
  },
  password: {
    type: String,
    required: [true, "Password is required!"],
    minLength: [4, "Password should be at least 4 characters"]
  },
});

userSchema.pre("save", async function () {
  const hash = await bcrypt.hash(this.password, SALT);

  this.password = hash;
});

const User = model("User", userSchema);

export default User;
