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

export const updateToken = async (token: string) => {
  const secretKey = new TextEncoder().encode(process.env.SECRET_KEY);
  const { payload } = await jwtVerify(token, secretKey);

  const newToken = await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("2h")
    .sign(secretKey);

  const response = NextResponse.next();

  response.cookies.set("token", newToken, {
    name: "token",
    value: newToken,
    maxAge: 60 * 60 * 2,
  });

  return response;
};
