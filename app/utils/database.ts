import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI!);
    console.log("MongoDB接続成功");
  } catch {
    console.log("MongoDB接続失敗");
    throw new Error();
  }
};

export default connectDB;
