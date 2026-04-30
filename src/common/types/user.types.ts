import type mongoose from "mongoose";

interface IUser {
    _id: mongoose.Types.ObjectId;
    name: string;
    email: string;
    password: string;
    role: "user" | "admin";
    isVerified?: boolean;
    logoutAt?: Date;
    verificationToken?: string | undefined;
    verificationTokenExpires?: Date | undefined;
    refreshToken?: string;
    resetPasswordToken?: string;
    resetPasswordExpires?: Date;
    comparePassword(candidatePassword: string): Promise<boolean>;
};

export type { IUser };