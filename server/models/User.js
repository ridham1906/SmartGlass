import { Schema, model } from "mongoose";

const userSchema = new Schema({
  firebaseUID: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ["student", "educator", "admin"],
    default: "student"
  }
}, { timestamps: true });

export default model("User", userSchema);
