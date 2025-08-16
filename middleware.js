import { NextResponse } from "next/server";
import { updateToken } from "./app/utils/auth";

export async function middleware(request) {
  const token = request.cookies.get("token")?.value;

  if (!token) return NextResponse.redirect(new URL("/user/login", request.url));

  try {
    return updateToken(token);
  } catch {
    console.log("jwtVerify エラー");
    return NextResponse.redirect(new URL("/user/login", request.url));
  }
}

export const config = {
  matcher: ["/"],
};
