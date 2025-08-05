import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://naoyukiumeda03:jmepmHrmhu0e41Mc@cluster0.wqaczpe.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    );
    console.log("Connected to MongoDB");
  } catch {
    console.log("Failed to connect to MongoDB");
    throw new Error();
  }
};

export default connectDB;
