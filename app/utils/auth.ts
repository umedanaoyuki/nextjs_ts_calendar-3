import { jwtVerify, SignJWT } from "jose";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

type GenerateTokenProps = {
  payload: {
    email: FormDataEntryValue | null;
  };
  secretKey: Uint8Array<ArrayBufferLike>;
};

export const generateToken = async ({
  payload,
  secretKey,
}: GenerateTokenProps): Promise<string> => {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("2h")
    .sign(secretKey);
};

type SetTokenCookieProps = {
  token: string;
  config: {
    maxAge: number;
    httpOnly: boolean;
  };
};

export const setTokenCookie = async ({
  token,
  config,
}: SetTokenCookieProps) => {
  const cookie = await cookies();
  cookie.set("token", token, config);
};

export const refreshToken = async (token: string): Promise<string> => {
  const secretKey = new TextEncoder().encode(process.env.SECRET_KEY);
  const { payload } = await jwtVerify(token, secretKey);

  // payloadの型を適切に変換
  const tokenPayload = {
    email: payload.email as string,
  };

  const newToken = await generateToken({
    payload: tokenPayload,
    secretKey,
  });

  return newToken;
};

export const withTokenCookie = (token: string) => {
  const response = NextResponse.next();
  response.cookies.set("token", token, {
    maxAge: 60 * 60 * 2,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });
  return response;
};
