import User from "./auth.model.ts";
import ApiError from "../../common/utils/api-error.ts";
import {
  generateAccessToken,
  generateRefreshToken,
  generateResetToken,
  verifyRefreshToken,
} from "../../common/utils/jwt.utils.ts";
import crypto from "node:crypto";
import sendEmail from "../../common/config/nodemailer.config.ts";
import { forgotPasswordMail, verificationMail } from "../../common/utils/mails.utilis.ts";

function hashedToken(token: string): string {
  return crypto.createHash("sha256").update(token).digest("hex");
};

export const registerService = async ({ name, email, password: pass, role }: { name: string; email: string; password: string; role: string}) => {
  const existedUser = await User.findOne({ email });

  if (existedUser) throw ApiError.existedUser();

  const { rawToken, hashedToken } = generateResetToken();

  const user = await User.create({
    name,
    email,
    password: pass,
    role,
    verificationToken: hashedToken,
    verificationTokenExpires: new Date(Date.now() + 15 * 60 * 1000)
  });

  if (!user) {
    throw ApiError.registrationFailed();
  };

  const userObject = user.toObject();

  const {password, refreshToken, verificationToken, verificationTokenExpires, ...rest} = userObject

  sendEmail(email, "Verify Your Account", verificationMail(name, `${process.env.FRONTEND_URL}/verify-email?token=${rawToken}`))
    .then(() => console.log("Verification email sent")).catch((error) => console.error("Error sending verification email:", error));

  return rest;
};

export const loginService = async ({ email, password: pass }: { email: string; password: string }) => {
  const user = await User.findOne({ email }).select("+password");

  if (!user) throw ApiError.userNotFound();
  if (!user.isVerified) throw ApiError.forbidden();

  const isPasswordMatch = await user.comparePassword(pass);

  if (!isPasswordMatch)
    throw ApiError.unauthorized(
      "Incorrect password: Please check your password",
    );

  const accessToken = generateAccessToken({ id: user._id.toString(), role: user.role });
  const newRefreshToken = generateRefreshToken({ id: user._id.toString() });

  user.refreshToken = hashedToken(newRefreshToken);
  await user.save({ validateBeforeSave: false });

  const userObject = user.toObject();

  const {password, refreshToken, ...rest} = userObject;

  return { user: rest, accessToken, refreshToken: newRefreshToken };
};

export const verifyEmailService = async (token: string) => {
  const user = await User.findOne({ verificationToken: hashedToken(token) }).select("+verificationTokenExpires");

  if (!user) throw ApiError.userNotFound();

  if (!user.verificationTokenExpires || user.verificationTokenExpires < new Date(Date.now()))
    throw ApiError.timeout("token expire");

  user.isVerified = true;
  user.verificationToken = undefined;
  user.verificationTokenExpires = undefined;

  await user.save();
};

export const refreshService = async (token: string) => {
  if (!token) throw ApiError.unauthorized("Refresh token is required");

  const decoded = verifyRefreshToken(token);
  if (!decoded) throw ApiError.unauthorized("You are not authorized");

  const user = await User.findById(decoded.id).select("+refreshToken");

  if (!user) throw ApiError.userNotFound();

  if (user.refreshToken !== hashedToken(token))
    throw ApiError.unauthorized("Invalid refresh token");

  const accessToken = generateAccessToken({ id: user._id.toString(), role: user.role });
  const refreshToken = generateRefreshToken({ id: user._id.toString() });

  user.refreshToken = hashedToken(refreshToken);
  await user.save({ validateBeforeSave: false });

  return { accessToken, refreshToken };
};

export const logoutService = async ({ _id: userId }: { _id: string}) => {
  const loggedOutUser = await User.findByIdAndUpdate(userId, {
    refreshToken: null,
    logoutAt: Date.now()
  });

  if (!loggedOutUser) throw ApiError.userNotFound();
};

export const forgotPasswordService = async ({ email }: { email: string }) => {
  const user = await User.findOne({ email });

  if (!user) throw ApiError.userNotFound();

  const { rawToken, hashedToken } = generateResetToken();

  user.resetPasswordToken = hashedToken;
  user.resetPasswordExpires = new Date(Date.now() + 15 * 60 * 1000);

  await user.save();

  //TODO: send mail to user
  sendEmail(email, "Reset Your Password", forgotPasswordMail(user.name, `${process.env.FRONTEND_URL}/reset-password?token=${rawToken}`))
    .then(() => console.log("Reset password email sent"))
    .catch((error) => console.error("Error sending reset password email:", error));
};

export const newPasswordService = async ({
  token,
  newPassword,
  confirmPassword,
}: { 
  token: string; 
  newPassword: string; 
  confirmPassword: string; 
}) => {
  if (!token) throw ApiError.badRequest("Token is required");
  
  if (newPassword !== confirmPassword)
    throw ApiError.badRequest(
      "New password and confirm password does not match",
    );

  const user = await User.findOne({ resetPasswordToken: hashedToken(token) }).select(
    "+resetPasswordToken +resetPasswordExpires",
  );

  if (!user) throw ApiError.userNotFound();

  if (!user.resetPasswordExpires || user.resetPasswordExpires < new Date(Date.now()))
    throw ApiError.timeout("token expire");

  user.password = newPassword;
  await user.save();
};
