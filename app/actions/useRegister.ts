"use server";

import { redirect } from "next/navigation";
import connectDB from "../utils/database";
import { UserModel } from "../utils/schemaModels";

export const useRegister = async (formData: FormData) => {
  const userData = {
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  };

  try {
    await connectDB();
    await UserModel.create(userData);
  } catch {
    throw new Error("ユーザー登録に失敗しました");
  }

  redirect("/user/login");
};
