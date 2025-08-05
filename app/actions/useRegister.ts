"use server";

import connectDB from "../utils/database";
import { UserModel } from "../utils/schemaModels";

export const useRegister = async (formData: FormData) => {
  const userData = {
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  };

  console.log({ userData });

  try {
    await connectDB();
    await UserModel.create(userData);
  } catch {
    throw new Error("ユーザー登録に失敗しました");
  }
};
