import mongoose from "mongoose";

const Schema = mongoose.Schema;

// DB用のスキーマ
const UserSchema = new Schema({
  name: {
    type: String,
    trim: true,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    required: true,
    unique: true,
    match: [
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "メールアドレスの形式が正しくありません",
    ],
  },
  password: {
    type: String,
    minlength: 8,
    maxlength: 500,
    required: true,
  },
});

export const UserModel =
  mongoose.models.User || mongoose.model("User", UserSchema);
