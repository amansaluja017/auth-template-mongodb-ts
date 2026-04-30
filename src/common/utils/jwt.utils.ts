import crypto from "crypto";
import jwt, { type JwtPayload, type SignOptions } from "jsonwebtoken";

export const generateAccessToken = (payload: {id: string, role: string}): string => {
  return jwt.sign(payload, process.env.AUTH_ACCESS_SECRET!, { expiresIn: process.env.AUTH_ACCESS_EXPIRE! || "15m" } as SignOptions);
};

export const generateRefreshToken = (payload: {id: string}): string => {
  return jwt.sign(payload, process.env.AUTH_REFRESH_SECRET!, { expiresIn: process.env.AUTH_REFRESH_EXPIRE! || "1d" } as SignOptions);
};

export const verifyAccessToken = (token: string): JwtPayload => {
  return jwt.verify(token, process.env.AUTH_ACCESS_SECRET!) as JwtPayload;
};

export const verifyRefreshToken = (token: string): JwtPayload => {
  return jwt.verify(token, process.env.AUTH_REFRESH_SECRET!) as JwtPayload;
};

export const generateResetToken = (): { rawToken: string, hashedToken: string } => {
  const rawToken = crypto.randomBytes(32).toString("hex");
  const hashedToken = crypto.createHash("sha256").update(rawToken).digest("hex");
  
  return { rawToken, hashedToken };
};
