import BaseDto from "../../../common/dto/base.dto.ts";
import {z} from "zod";

class RegisterDto extends BaseDto {
  static schema = z.object({
    name: z.string().trim().min(2).max(50).nonempty(),
    email: z.email().lowercase().nonempty(),
    password: z.string().min(8).nonempty(),
    role: z.enum(["user", "admin"]).default("user")
  }).strict()
};

class LoginDto extends BaseDto {
  static schema = z.object({
    email: z.email().lowercase().nonempty(),
    password: z.string().min(8).nonempty(),
  }).strict()
};

class ForgotPasswordDto extends BaseDto {
  static schema = z.object({
    email: z.email().lowercase().nonempty(),
  }).strict()
};

class NewPasswordDto extends BaseDto {
  static schema = z.object({
    newPassword: z.string().min(8).nonempty(),
    confirmPassword: z.string().nonempty()
  }).strict()
};

export { RegisterDto, LoginDto, ForgotPasswordDto, NewPasswordDto };
