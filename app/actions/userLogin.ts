"use server";

import connectDB from "../utils/database";
import { UserModel } from "../utils/schemaModels";
import { redirect } from "next/navigation";
import { generateToken, setTokenCookie } from "../utils/auth";

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

    if (!savedUserData)
      return { message: "エラー：ユーザー登録をしてください" };

    if (password !== savedUserData.password)
      return { message: "パスワードが間違っています" };

    if (savedUserData) {
      if (password === savedUserData.password) {
        // シークレットキー
        const secretKey = new TextEncoder().encode(process.env.SECRET_KEY);

        const payload = {
          email,
        };

        const token = await generateToken({ payload, secretKey });

        setTokenCookie({ token, config });
      }
    }
  } catch {
    return { message: "ログインに失敗しました" };
  }

  redirect("/");
};
