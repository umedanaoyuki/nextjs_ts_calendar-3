import { z } from "zod";

export const LoginSchema = z.object({
  email: z.string().email({ message: "メールアドレスを入力してください" }),
  password: z
    .string()
    .min(8, { message: "8文字以上でパスワードを入力してください" })
    .max(500, { message: "パスワードは30文字以内にしてください" }),
});

export const SignupSchema = z.object({
  name: z
    .string()
    .min(2, { message: "2文字以上で名前を入力してください" })
    .max(30, { message: "名前は30文字以内にしてください" }),
  email: z.string().email({ message: "メールアドレスを入力してください" }),
  password: z
    .string()
    .min(8, { message: "8文字以上でパスワードを入力してください" })
    .max(500, { message: "パスワードは30文字以内にしてください" }),
});
