import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import {
  registerSchema,
  loginSchema,
} from "../utils/validations/auth.validation.js";
import { OAuth2Client } from "google-auth-library";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const isProduction = process.env.NODE_ENV === "production";

const cookieOptions = {
  httpOnly: true,
  secure: isProduction,
  sameSite: isProduction ? "none" : "lax",
  maxAge: 1 * 24 * 60 * 60 * 1000,
};

export const googleAuth = asyncHandler(async (req, res) => {
  const { googleAuthToken } = req.body;

  if (!googleAuthToken) {
    throw new ApiError(400, "Token is missing");
  }

  const ticket = await client.verifyIdToken({
    idToken: googleAuthToken,
    audience: process.env.GOOGLE_CLIENT_ID,
  });

  const payload = ticket.getPayload();

  const { name, email, picture, sub: googleId } = payload;

  if (!email) {
    throw new ApiError(400, "Google account has no email");
  }

  let user = await User.findOne({ $or: [{ email }, { googleId }] });

  let isNewUser = false;

  if (!user) {
    user = await User.create({
      fullName: name,
      email,
      googleId,
      authProvider: "google",
      profileImage: picture,
    });
    isNewUser = true;
  }
  const token = user.generateToken();

  return res
    .status(200)
    .cookie("token", token, cookieOptions)
    .json(
      new ApiResponse(
        200,
        {
          user: {
            id: user._id,
            name: user.fullName,
            email: user.email,
            role: user.role,
            profileImage: user.profileImage,
            authProvider: user.authProvider,
          },
        },
        isNewUser ? "Account created successfully." : "Login successful."
      )
    );
});

export const RegisterUser = asyncHandler(async (req, res) => {
  const parseData = registerSchema.safeParse(req.body);
  if (!parseData.success) {
    const errors = parseData.error.issues.map((issue) => ({
      field: issue.path[0],
      message: issue.message,
    }));
    console.log(errors);
    throw new ApiError(
      400,
      "Validation failed. Please check your input.",
      errors
    );
  }

  const { fullName, email, phoneNumber, password } = parseData.data;

  const query = {};
  if (email) query.email = email;
  if (phoneNumber) query.phoneNumber = phoneNumber;

  const existingUser = await User.findOne(query);

  if (existingUser) {
    throw new ApiError(409, "User already exists.");
  }

  const newUser = await User.create({ fullName, email, phoneNumber, password });

  const token = newUser.generateToken();

  return res
    .status(201)
    .cookie("token", token, cookieOptions)
    .json(
      new ApiResponse(
        201,
        {
          user: {
            id: newUser._id,
            fullName: newUser.fullName,
            email: newUser?.email,
            phoneNumber: newUser?.phoneNumber,
            role: newUser.role,
            authProvider: newUser.authProvider,
            profileImage: newUser.profileImage,
          },
          token,
        },
        "Registration successful."
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
    throw new ApiError(
      400,
      "Validation failed. Please check your input.",
      errors
    );
  }

  const { email, phoneNumber, password } = parseData.data;

  const query = {};
  if (email) query.email = email;
  if (phoneNumber) query.phoneNumber = phoneNumber;

  const userExist = await User.findOne(query).select("+password");

  if (!userExist) {
    throw new ApiError(404, "User not found.");
  }

  const isPasswordCorrect = await userExist.comparePassword(password);

  if (!isPasswordCorrect) {
    throw new ApiError(400, "Incorrect password.");
  }

  const token = userExist.generateToken();

  return res
    .status(200)
    .cookie("token", token, cookieOptions)
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
          token,
        },
        "Login successful."
      )
    );
});

export const LogoutUser = asyncHandler(async (req, res) => {
  return res
    .status(200)
    .clearCookie("token", { ...cookieOptions, maxAge: 0 })
    .json(new ApiResponse(200, {}, "Logout successful."));
});

export const CurrentUser = asyncHandler(async (req, res) => {
  const user = req.user;

  if (!user) {
    throw new ApiError(401, "Unauthorized user!");
  }

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        user: {
          _id: user._id,
          fullName: user.fullName,
          email: user.email,
          phoneNumber: user.phoneNumber,
          profileImage: user.profileImage,
          role: user.role,
        },
      },
      "User data retrieved."
    )
  );
});
