"use server";

import { cookies } from "next/headers";
import { SignJWT } from "jose";
import connectDB from "../utils/database";
import { UserModel } from "../utils/schemaModels";

const config = {
  maxAge: 60 * 60 * 2,
  httpOnly: true,
};

export const userLogin = async (
  prevState: { message: string } | undefined,
  formData: FormData
): Promise<{ message: string } | undefined> => {
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
        console.log("ログイン成功");
        // シークレットキー
        const secretKey = new TextEncoder().encode("calender-app");

        const payload = {
          email: userData.email,
        };

        const token = await new SignJWT(payload)
          .setProtectedHeader({ alg: "HS256" })
          .setExpirationTime("2h")
          .sign(secretKey);

        const cookie = await cookies();
        cookie.set("token", token, config);
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
