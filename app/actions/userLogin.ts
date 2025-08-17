"use server";

import connectDB from "../utils/database";
import { UserModel } from "../utils/schemaModels";
import { redirect } from "next/navigation";
import { generateToken } from "../utils/auth";
import { compareSync } from "bcryptjs";
import { cookies } from "next/headers";

const config = {
  maxAge: 60 * 60 * 2,
  httpOnly: true,
};

export const userLogin = async (
  prevState: { message: string } | undefined,
  formData: FormData
): Promise<{ message: string } | undefined> => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  try {
    await connectDB();
    const savedUserData = await UserModel.findOne({ email });
    if (!savedUserData) {
      console.log("ユーザー登録をしてください");
      return { message: "エラー：ユーザー登録をしてください" };
    }

    const isPasswordValid = compareSync(password, savedUserData.password);

    if (!isPasswordValid) {
      console.log("パスワードが間違っています");
      return { message: "パスワードが間違っています" };
    }

    const secretKey = new TextEncoder().encode(process.env.SECRET_KEY);

    const payload = {
      email,
    };

    const token = await generateToken({ payload, secretKey });

    // Server Action内でクッキーを設定
    const cookie = await cookies();
    cookie.set("token", token, config);
    console.log("ログイン成功");
  } catch {
    return { message: "ログインに失敗しました" };
  }

  redirect("/");
};
