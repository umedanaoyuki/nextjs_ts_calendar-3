"use server";
import bcrypt from "bcryptjs";
import { actionClient } from "../lib/safe-action";
import { UserModel } from "../utils/schemaModels";
import connectDB from "../utils/database";
import { SignupSchema } from "../utils/SignupSchema";

export const sigup = actionClient
  .schema(SignupSchema)
  .action(async ({ parsedInput: { name, email, password } }) => {
    const hashedPassword = bcrypt.hashSync(password, 10);

    const userData = {
      name,
      email,
      password: hashedPassword,
    };

    console.log({ userData });

    try {
      await connectDB();
      await UserModel.create(userData);

      return {
        success: true,
        message: "ユーザー登録が完了しました",
      };
    } catch (err) {
      console.log({ err });
      return {
        success: false,
        message: "ユーザー登録に失敗しました",
      };
    }
  });
