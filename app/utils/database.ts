import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://naoyukiumeda03:CxiL5DicL2eroTuH@cluster0.mjjo57r.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    );
    console.log("Connected to MongoDB");
  } catch {
    console.log("Failed to connect to MongoDB");
    throw new Error();
  }
};

export default connectDB;
