"use server";

import connectDB from "../utils/database";
import { UserModel } from "../utils/schemaModels";

export const userLogin = async (
  prevState: { message: string },
  formData: FormData
) => {
  const userData = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  try {
    await connectDB();
    const savedUserData = await UserModel.findOne({ email: userData.email });
    console.log({ savedUserData });

    if (savedUserData) {
      if (userData.password === savedUserData.password) {
        return { message: "ログイン成功" };
      } else {
        return { message: "パスワードが間違っています" };
      }
    } else {
      return { message: "エラー：ユーザー登録をしてください" };
    }
  } catch {
    return { message: "ログインに失敗しました" };
  }
};
