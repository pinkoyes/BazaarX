import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      trim: true,
      required: true,
      minLength: 3,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
      sparse: true,
      minLength: 3,
      match: [
        /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/,
        "Please enter a valid email address",
      ],
    },
    phoneNumber: {
      type: String,
      trim: true,
      unique: true,
      sparse: true,
      match: [
        /^(?:\+91[\-\s]?|0)?[6-9]\d{9}$/,
        "Please enter a valid Indian phone number",
      ],
    },
    password: {
      type: String,
      select: false,
      required: function () {
        this.authProvider === "local";
      },
    },
    role: {
      type: String,
      enum: ["user", "admin", "delivery_agent"],
      default: "user",
    },
    googleId: {
      type: String,
      unique: true,
      sparse: true,
    },
    authProvider: {
      type: String,
      enum: ["local", "google"],
      default: "local",
    },
    profileImage: {
      type: String,
    },
    refreshToken: {
      type: String,
    },
  },
  { timestamps: true }
);

// hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password") || this.authProvider !== "local")
    return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// generate accessToken
userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    { _id: this._id, role: this.role },
    process.env.JWT_ACCESS_SECRET,
    { expiresIn: "2d" }
  );
};

// generate refreshToken
userSchema.methods.generateRefreshToken = function () {
  return jwt.sign({ _id: this._id }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: "2d",
  });
};

// compare password
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

export const User = mongoose.model("User", userSchema);
