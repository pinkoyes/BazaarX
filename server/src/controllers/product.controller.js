import { Product } from "../models/product.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import {
  createProductSchema,
  updateProductSchema,
} from "../utils/validations/product.validation.js";
import { uploadToCloudinary, deleteFromCloudinary } from "../utils/helper.js";

export const createProduct = asyncHandler(async (req, res) => {
  const ownerId = req.user?._id;
  let uploadedFiles = [];

  if (req.files && req.files.length > 0) {
    uploadedFiles = await Promise.all(
      req.files.map(async (file) => {
        const result = await uploadToCloudinary(file);
        return {
          url: result.secure_url,
          type: result.resource_type,
          public_id: result.public_id,
        };
      })
    );
  }

  const productData = { ...req.body, ownerId, media: uploadedFiles };

  const validateProductData = createProductSchema.safeParse(productData);
  if (!validateProductData.success) {
    await Promise.all(
      uploadedFiles.map((f) => deleteFromCloudinary(f.public_id, f.type))
    );
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

// find all product user have created
export const fetchUserProducts = asyncHandler(async (req, res) => {
  const ownerId = req.params?.id;
  if (!ownerId) {
    throw new ApiError(404, "OwnerId not found.");
  }

  const products = await Product.find({ ownerId });
  if (!products) {
    throw new ApiError(404, "Products not found.");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, products, "Fetch products successfully!"));
});

export const productsForHomePage = asyncHandler(async (req, res) => {
  const products = await Product.find().limit(6);
  if (!products) {
    throw new ApiError(404, "Products not found.");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, products, "Fetch prodcts data for home page!"));
});

export const productByCategory = asyncHandler(async (req, res) => {
  const { category } = req.query;

  if (!category) {
    throw new ApiError(400, "Category is required");
  }

  const products = await Product.find({ category }).sort({ createdAt: -1 });

  if (!products || products.length === 0) {
    throw new ApiError(404, "No products found in this category");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        products,
        "Fetched products by category successfully!"
      )
    );
});

export const getCategories = asyncHandler(async (req, res) => {
  const categories = await Product.aggregate([
    {
      $group: {
        _id: "$category",
        totalProducts: { $sum: 1 },
        // grab one sample media (image) from the group
        sampleProduct: { $first: "$$ROOT" },
      },
    },
    { $sort: { totalProducts: -1 } },
    { $limit: 8 },
    {
      $project: {
        _id: 0,
        category: "$_id",
        totalProducts: 1,
        image: {
          // pick the first media url if available
          $arrayElemAt: [
            {
              $map: {
                input: "$sampleProduct.media",
                as: "m",
                in: "$$m.url",
              },
            },
            0,
          ],
        },
      },
    },
  ]);

  if (!categories) {
    throw new ApiError(404, "Categories not found.");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, categories, "Fetched category successfully!"));
});
