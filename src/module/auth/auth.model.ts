import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import type { IUser } from "../../common/types/user.types.ts";

const userSchema = new Schema<IUser>({
  name: {
    type: String,
    trim: true,
    minlength: 2,
    maxlength: 50,
    required: [true, "Name is required"]
  },
  email: {
    type: String,
    trim: true,
    unique: true,
    lowercase: true,
    required: [true, "Email is required"]
  },
  password: {
    type: String,
    minlength: 8,
    required: [true, "Password is required"],
    select: false
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user"
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  logoutAt: {
    type: Date,
    select: false
  },
  verificationToken: {
    type: String,
    select: false
  },
  verificationTokenExpires: {
    type: Date,
    select: false
  },
  refreshToken: {
    type: String,
    select: false
  },
  resetPasswordToken: {
    type: String,
    select: false
  },
  resetPasswordExpires: {
    type: Date,
    select: false
  }
}, { timestamps: true });

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.comparePassword = async function (candidatePassword: string) {
  return await bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.model("User", userSchema);
