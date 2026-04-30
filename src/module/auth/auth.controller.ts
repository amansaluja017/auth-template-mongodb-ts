import type { Request, Response } from "express";
import ApiError from "../../common/utils/api-error.ts";
import {
  forgotPasswordService,
  loginService,
  logoutService,
  newPasswordService,
  refreshService,
  registerService,
  verifyEmailService,
} from "./auth.service.ts";
import ApiResponse from "../../common/utils/api-response.ts";

export const registerCustomer = async (req: Request, res: Response) => {
  const user = await registerService(req.body);

  if (!user) {
    throw ApiError.registrationFailed();
  }

  ApiResponse.created(res, "Registration sucess", user);
};

export const loginCustomer = async (req: Request, res: Response) => {
  const response = await loginService(req.body);

  if (!response) {
    throw ApiError.loginFailed();
  };

  const { user, accessToken, refreshToken } = response;

  if (!user || !accessToken || !refreshToken) {
    throw ApiError.loginFailed();
  };

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  ApiResponse.ok(res, "user login successfully", { user, accessToken });
};

export const verifyEmail = async (req: Request<any, any, any, { token: string }>, res: Response) => {
  const { token }: { token: string } = req.query;

  if (!token) {
    throw ApiError.badRequest("Verification token is required");
  };

  await verifyEmailService(token);

  ApiResponse.ok(res, "email verified successfully");
};

export const refreshCustomer = async (req: Request, res: Response) => {

  const token = req.cookies.refreshToken;

  if (!token) {
    throw ApiError.unauthorized("Refresh token is required");
  };

  const { accessToken, refreshToken } = await refreshService(token);

  if (!accessToken || !refreshToken) {
    throw ApiError.requestFailed(
      "Internal server error: unable to generate tokens",
    );
  };

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  ApiResponse.ok(res, "token generate successfully", accessToken);
};

export const logoutCustomer = async (req: Request, res: Response) => {
  if (!req.user) {
    throw ApiError.unauthorized("You are not authorized");
  };

  await logoutService(req.user);

  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });

  ApiResponse.ok(res, "user logged out successfully");
};

export const profile = async (req: Request, res: Response) => {
  if (!req.user) {
    throw ApiError.unauthorized("You are not authorized");
  };

  ApiResponse.ok(res, "user profile", req.user);
};

export const forgotPassword = async (req: Request, res: Response) => {
  await forgotPasswordService(req.body);

  ApiResponse.ok(res, "Token send to user's mail successfully")
};

export const newPassword = async (req: Request<{ token: string }, {}, { newPassword: string, confirmPassword: string }>, res: Response) => {
  const { token }: { token: string } = req.params;
  const { newPassword, confirmPassword } = req.body;

  await newPasswordService({ token, newPassword, confirmPassword });

  ApiResponse.ok(res, "password changed successfully");
};
