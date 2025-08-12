"use server";

import { cookies } from "next/headers";
import { SignJWT } from "jose";
import connectDB from "../utils/database";
import { UserModel } from "../utils/schemaModels";
import { redirect } from "next/navigation";

const config = {
  maxAge: 60 * 60 * 2,
  httpOnly: true,
};

export const userLogin = async (
  prevState: { message: string } | undefined,
  formData: FormData
): Promise<{ message: string } | undefined> => {
  const [email, password] = [formData.get("email"), formData.get("password")];

  try {
    await connectDB();
    const savedUserData = await UserModel.findOne({ email });

    if (savedUserData) {
      if (password === savedUserData.password) {
        // シークレットキー
        const secretKey = new TextEncoder().encode(process.env.SECRET_KEY);

        const payload = {
          email,
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

  redirect("/");
};
