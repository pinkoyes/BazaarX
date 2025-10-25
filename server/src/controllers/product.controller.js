import { Product } from "../models/product.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import {
  createProductSchema,
  updateProductSchema,
} from "../utils/validations/product.validation.js";

export const createProduct = asyncHandler(async (req, res) => {
  const ownerId = req.user?._id;
  const productData = { ...req.body, ownerId };

  const validateProductData = createProductSchema.safeParse(productData);
  if (!validateProductData.success) {
    const errors = validateProductData.error.issues.map((issue) => ({
      field: issue.path[0],
      message: issue.message,
    }));
    throw new ApiError(400, "Validation error", errors);
  }

  const product = await Product.create(validateProductData.data);

  return res
    .status(201)
    .json(new ApiResponse(201, product, "Product created successfully!"));
});

export const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find().populate("ownerId", "fullName email");
  return res
    .status(200)
    .json(new ApiResponse(200, products, "Fetch all products"));
});

export const getProductById = asyncHandler(async (req, res) => {
  const productId = req.params?.id;
  if (!productId) throw new ApiError(400, "No product id found");

  const product = await Product.findById(productId).populate(
    "ownerId",
    "fullName email"
  );
  if (!product) throw new ApiError(404, "Product not found.");

  return res
    .status(200)
    .json(new ApiResponse(200, product, "Product fetched successfully"));
});

export const updateProduct = asyncHandler(async (req, res) => {
  const productId = req.params?.id;
  if (!productId) throw new ApiError(400, "Product ID is required");

  const validateProductData = updateProductSchema.safeParse(req.body);
  if (!validateProductData.success) {
    const errors = validateProductData.error.issues.map((issue) => ({
      field: issue.path[0],
      message: issue.message,
    }));
    throw new ApiError(400, "Validation error", errors);
  }

  const product = await Product.findById(productId);
  if (!product) throw new ApiError(404, "Product not found");

  if (product.ownerId.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "You are not allowed to modify this product");
  }

  const updatedProduct = await Product.findByIdAndUpdate(
    productId,
    { $set: validateProductData.data },
    { new: true, runValidators: true }
  ).populate("ownerId", "fullName email");

  return res
    .status(200)
    .json(new ApiResponse(200, updatedProduct, "Product updated successfully"));
});

export const deleteProduct = asyncHandler(async (req, res) => {
  const productId = req.params?.id;

  const product = await Product.findById(productId);
  if (!product) throw new ApiError(404, "No product found");

  if (product.ownerId.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "You are not allowed to delete this product");
  }

  const deletedProduct = await Product.findByIdAndDelete(productId);

  return res
    .status(200)
    .json(new ApiResponse(200, deletedProduct, "Product deleted successfully"));
});
