import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import {
  registerSchema,
  loginSchema,
} from "../utils/validations/auth.validation.js";
import jwt from "jsonwebtoken";

const isProduction = process.env.NODE_ENV === "production";

const accessTokenOptions = {
  httpOnly: true,
  secure: isProduction,
  sameSite: isProduction ? "none" : "lax",
  maxAge: 2 * 24 * 60 * 60 * 1000,
};

const refreshTokenOptions = {
  httpOnly: true,
  secure: isProduction,
  sameSite: isProduction ? "none" : "lax",
  maxAge: 7 * 24 * 60 * 60 * 1000,
};

export const RegisterUser = asyncHandler(async (req, res) => {
  const parseData = registerSchema.safeParse(req.body);
  if (!parseData.success) {
    const errors = parseData.error.issues.map((issue) => ({
      field: issue.path[0],
      message: issue.message,
    }));
    console.log(errors);
    throw new ApiError(400, "Validation Error", errors);
  }

  const { fullName, email, phoneNumber, password } = parseData.data;

  const query = {};
  if (email) query.email = email;
  if (phoneNumber) query.phoneNumber = phoneNumber;

  const existingUser = await User.findOne(query);

  if (existingUser) {
    throw new ApiError(409, "User already exist!");
  }

  const newUser = await User.create({ fullName, email, phoneNumber, password });

  const accessToken = newUser.generateAccessToken();
  const refreshToken = newUser.generateRefreshToken();
  newUser.refreshToken = refreshToken;
  await newUser.save();

  return res
    .status(201)
    .cookie("accessToken", accessToken, accessTokenOptions)
    .cookie("refreshToken", refreshToken, refreshTokenOptions)
    .json(
      new ApiResponse(
        201,
        {
          user: {
            id: newUser._id,
            fullName: newUser.fullName,
            email: newUser.email,
            phoneNumber: newUser.phoneNumber,
            role: newUser.role,
            authProvider: newUser.authProvider,
            profileImage: newUser.profileImage,
          },
          accessToken,
          refreshToken,
        },
        "User created successfully!"
      )
    );
});

export const LoginUser = asyncHandler(async (req, res) => {
  const parseData = loginSchema.safeParse(req.body);

  if (!parseData.success) {
    const errors = parseData.error.issues.map((issue) => ({
      field: issue.path[0],
      message: issue.message,
    }));
    console.log(errors);
    throw new ApiError(400, "Validation Error", errors);
  }

  const { email, phoneNumber, password } = parseData.data;

  const query = {};
  if (email) query.email = email;
  if (phoneNumber) query.phoneNumber = phoneNumber;

  const userExist = await User.findOne(query);

  if (!userExist) {
    throw new ApiError(404, "User not exist with given credentials");
  }

  const isPasswordCorrect = await userExist.comparePassword(password);

  if (!isPasswordCorrect) {
    throw new ApiError(400, "Invalid password");
  }

  const accessToken = userExist.generateAccessToken();
  const refreshToken = userExist.generateRefreshToken();
  userExist.refreshToken = refreshToken;
  await userExist.save();

  return res
    .status(200)
    .cookie("accessToken", accessToken, accessTokenOptions)
    .cookie("refreshToken", refreshToken, refreshTokenOptions)
    .json(
      new ApiResponse(
        200,
        {
          user: {
            id: userExist._id,
            fullName: userExist.fullName,
            email: userExist.email,
            phoneNumber: userExist.phoneNumber,
            role: userExist.role,
            authProvider: userExist.authProvider,
            profileImage: userExist.profileImage,
          },
          accessToken,
          refreshToken,
        },
        "User login successfully!"
      )
    );
});

export const LogoutUser = asyncHandler(async (req, res) => {
  const user = req.user;
  const updateUser = await User.findByIdAndUpdate(
    user?._id,
    { $unset: { refreshToken: 1 } },
    { new: true }
  );

  return res
    .status(200)
    .clearCookie("accessToken", { ...accessTokenOptions, maxAge: 0 })
    .clearCookie("refreshToken", { ...refreshTokenOptions, maxAge: 0 })
    .json(new ApiResponse(200, {}, "User Logout Successfully!"));
});

export const RefreshToken = asyncHandler(async (req, res) => {
  const { refreshToken } = req.cookies;
  if (!refreshToken) throw new ApiError(401, "No refresh token found");

  const user = await User.findOne({ refreshToken });
  if (!user) throw new ApiError(401, "Invalid refresh token");

  jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

  const accessToken = user.generateAccessToken();
  const newRefreshToken = user.generateRefreshToken();
  user.refreshToken = newRefreshToken;
  await user.save();

  return res
    .cookie("accessToken", accessToken, accessTokenOptions)
    .cookie("refreshToken", newRefreshToken, refreshTokenOptions)
    .json({ accessToken, refreshToken: newRefreshToken });
});
