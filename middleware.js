import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(request) {
  const token = request.cookies.get("token")?.value;

  if (!token) return NextResponse.redirect(new URL("/user/login", request.url));

  try {
    const secretKey = new TextEncoder().encode(process.env.SECRET_KEY);
    await jwtVerify(token, secretKey);
    return NextResponse.next();
  } catch {
    console.log("jwtVerify エラー");
    return NextResponse.redirect(new URL("/user/login", request.url));
  }
}

export const config = {
  matcher: ["/"],
};
