"use server";
import connectDB from "../utils/database";
import { compareSync } from "bcryptjs";
import { actionClient } from "../lib/safe-action";
import { UserModel } from "../utils/schemaModels";
import { LoginSchema } from "../utils/LoginSchema";
import { generateToken } from "../utils/auth";
import { cookies } from "next/headers";

const config = {
  maxAge: 60 * 60 * 2,
  httpOnly: true,
};

export const login = actionClient
  .schema(LoginSchema)
  .action(async ({ parsedInput: { email, password } }) => {
    try {
      await connectDB();
      const savedUserData = await UserModel.findOne({ email });

      if (!savedUserData) {
        return {
          success: false,
          message: "ユーザー登録をしてください",
        };
      }

      console.log({ password });
      console.log({ savedUserData });

      const isPasswordValid = compareSync(password, savedUserData.password);

      console.log({ isPasswordValid });

      if (!isPasswordValid) {
        console.log("パスワードが間違っています");
        return {
          success: false,
          message: "ログイン情報が間違っています",
        };
      }

      const secretKey = new TextEncoder().encode(process.env.SECRET_KEY);

      const payload = {
        email,
      };

      const token = await generateToken({ payload, secretKey });

      const cookie = await cookies();
      cookie.set("token", token, config);
      console.log("ログイン成功");

      return {
        success: true,
        message: "ログインしました",
      };
    } catch (err) {
      console.log({ err });
      return {
        success: false,
        message: "ログインに失敗しました",
      };
    }
  });
