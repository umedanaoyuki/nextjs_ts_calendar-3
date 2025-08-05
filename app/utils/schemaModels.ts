import mongoose from "mongoose";

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: String,
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const ItemSchema = new Schema({
  title: String,
  image: String,
  price: String,
  description: String,
  enmail: String,
});

export const UserModel =
  mongoose.models.User || mongoose.model("User", UserSchema);

export const ItemModel =
  mongoose.models.Item || mongoose.model("Item", ItemSchema);
