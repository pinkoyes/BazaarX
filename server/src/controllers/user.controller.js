import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import cloudinary from "../config/cloudinary.js";

export const userInfo = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (!user) throw new ApiError(404, "User not found");

  return res
    .status(200)
    .json(new ApiResponse(200, user, "Fetched user info successfully"));
});

export const updateUserInfo = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const { fullName, email, phoneNumber, password } = req.body;

  const user = await User.findById(userId);

  if (fullName) user.fullName = fullName.trim();
  if (phoneNumber) user.phoneNumber = phoneNumber.trim();
  if (email) user.email = email.trim().toLowerCase();
  if (password) user.password = password.trim();

  if (req.file) {
    // If old image exists, delete from Cloudinary
    if (user.profileImage) {
      const publicId = user.profileImage.split("/").pop().split(".")[0];
      try {
        await cloudinary.uploader.destroy(`user_profiles/${publicId}`);
      } catch (err) {
        console.warn("Failed to delete old image:", err.message);
      }
    }

    // Upload new image
    const uploadPromise = new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: "user_profiles" },
        (error, result) => {
          if (error) reject(new ApiError(500, "Image upload failed"));
          else resolve(result);
        }
      );
      stream.end(req.file.buffer);
    });

    const result = await uploadPromise;
    user.profileImage = result.secure_url;
  }

  await user.save();

  const safeUser = await User.findById(userId);

  return res
    .status(200)
    .json(new ApiResponse(200, safeUser, "Profile updated successfully"));
});

export const deleteUserAccount = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const user = await User.findById(userId);
  if (!user) throw new ApiError(404, "User not found");

  // Delete profile image from Cloudinary if exists
  if (user.profileImage) {
    const publicId = user.profileImage.split("/").pop().split(".")[0];
    try {
      await cloudinary.uploader.destroy(`user_profiles/${publicId}`);
    } catch (err) {
      console.warn("Failed to delete image from Cloudinary:", err.message);
    }
  }

  await User.findByIdAndDelete(userId);

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Account deleted successfully"));
});
