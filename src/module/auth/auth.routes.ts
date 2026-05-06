import express from "express";
import validate from "../../common/middleware/validate.middleware.ts";
import { RegisterDto, LoginDto, NewPasswordDto, ForgotPasswordDto } from "./dto/auth.dto.ts";
import * as Controller from "./auth.controller.ts";
import { requireAuth } from "./auth.middleware.ts";

const router = express.Router();

router.post("/register", validate(RegisterDto), Controller.registerCustomer);
router.post("/login", validate(LoginDto), Controller.loginCustomer);
router.get("/verify-email", Controller.verifyEmail);
router.get("/refresh", Controller.refreshCustomer);
router.post("/logout", requireAuth, Controller.logoutCustomer);
router.get("/profile", requireAuth, Controller.profile);
router.put("/forgot-password", validate(ForgotPasswordDto), Controller.forgotPassword);
router.patch("/new-password/:token", validate(NewPasswordDto), Controller.newPassword);

export default router;
