import { SignJWT } from "jose";
import { cookies } from "next/headers";

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
