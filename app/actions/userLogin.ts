"use server";

import connectDB from "../utils/database";
import { UserModel } from "../utils/schemaModels";

export const userLogin = async (formData) => {
  const userData = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  try {
    await connectDB();
    const savedData = await UserModel.findOne({ email: userData.email });
    console.log({ savedData });
    return { message: "ログイン成功" };
  } catch {
    return { message: "ログインに失敗しました" };
  }
};
