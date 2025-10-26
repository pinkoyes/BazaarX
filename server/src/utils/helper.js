import cloudinary from "../config/cloudinary.js";
import streamifier from "streamifier";

export const uploadToCloudinary = (file) => {
  return new Promise((resolve, reject) => {
    // <-- return the promise
    const resourceType = file.mimetype.startsWith("video") ? "video" : "image";
    const uploadStream = cloudinary.uploader.upload_stream(
      { resource_type: resourceType, folder: "products" },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    );
    streamifier.createReadStream(file.buffer).pipe(uploadStream);
  });
};

export const deleteFromCloudinary = async (public_id, resource_type) => {
  try {
    await cloudinary.uploader.destroy(public_id, { resource_type });
  } catch (err) {
    console.error("Failed to delete from Cloudinary:", err);
  }
};
