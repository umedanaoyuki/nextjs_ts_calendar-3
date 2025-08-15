import mongoose from "mongoose";

let isConnected = false;

const connectDB = async () => {
  if (isConnected) {
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI!);
    isConnected = true;
    console.log("MongoDB接続成功");
  } catch (err) {
    console.log("MongoDB接続失敗");
    throw err;
  }
};

export default connectDB;
