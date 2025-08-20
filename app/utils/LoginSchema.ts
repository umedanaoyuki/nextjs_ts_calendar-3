import { z } from "zod";

// クライアントサイド用のスキーマ
export const LoginSchema = z.object({
  email: z.string().email({ message: "メールアドレスを入力してください" }),
  password: z
    .string()
    .min(8, { message: "8文字以上でパスワードを入力してください" })
    .max(500, { message: "パスワードは30文字以内にしてください" }),
});
