"use server";
import { cookies } from "next/headers";

export const logout = async () => {
  const cookieStore = await cookies();

  try {
    cookieStore.delete("token");

    return {
      success: true,
      message: "ログアウトしました",
    };
  } catch (error) {
    console.error({ error });
    return {
      success: false,
      message: "ログアウトに失敗しました",
    };
  }
};
