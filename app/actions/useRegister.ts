"use server";

import { redirect } from "next/navigation";
import connectDB from "../utils/database";
import { UserModel } from "../utils/schemaModels";
import bcrypt from "bcryptjs";

export const useRegister = async (formData: FormData) => {
  const hashedPassword = bcrypt.hashSync(
    formData.get("password") as string,
    10
  );

  const userData = {
    name: formData.get("name"),
    email: formData.get("email"),
    password: hashedPassword,
  };

  try {
    await connectDB();
    await UserModel.create(userData);
  } catch {
    throw new Error("ユーザー登録に失敗しました");
  }

  redirect("/user/login");
};
