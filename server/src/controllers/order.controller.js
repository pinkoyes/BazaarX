import { Order } from "../models/order.model.js";
import { Product } from "../models/product.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const placeOrder = asyncHandler(async (req, res) => {
  const { productId, deliveryAddress, paymentMethod } = req.body;
  const buyerId = req.user?._id;

  const product = await Product.findById(productId).populate("ownerId");

  if (!product) {
    throw new ApiError(404, "Product not found.");
  }

  if (!product.available) {
    throw new ApiError(404, "Product already sold");
  }

  if (product.ownerId._id.toString() === buyerId.toString()) {
    throw new ApiError(400, "You cannot buy your own product.");
  }

  const order = await Order.create({
    productId: product._id,
    buyerId,
    sellerId: product.ownerId._id,
    priceAtPurchase: product.price,
    paymentStatus: "unpaid",
    paymentInfo: {
      provider: paymentMethod || "cod",
    },
    deliveryAddress,
  });

  await Product.findByIdAndUpdate(product._id, { $set: { available: false } });

  return res
    .status(201)
    .json(new ApiResponse(201, order, "Order placed successfully"));
});

export const myOrders = asyncHandler(async (req, res) => {
  const buyerId = req.user?._id;

  if (!buyerId) {
    throw new ApiError(401, "Unauthorized user");
  }

  const orders = await Order.find({ buyerId })
    .populate("productId")
    .populate("sellerId", "fullName email phoneNumber");

  if (!orders || orders.length === 0) {
    throw new ApiError(404, "No order is placed by you yet.");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, orders, "Fetched your all orders"));
});

export const sellerOrders = asyncHandler(async (req, res) => {
  const sellerId = req.user?._id;

  if (!sellerId) {
    throw new ApiError(401, "Unauthorized user");
  }

  const orders = await Order.find({ sellerId })
    .populate("productId")
    .populate("buyerId", " fullName email phoneNumber");

  if (!orders) {
    throw new ApiError(404, "No orders exists yet");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, orders, "Fetched all orders details"));
});

export const OrderStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const sellerId = req.user?._id;

  const order = await Order.findById(id);

  if (!order) {
    throw new ApiError(404, "Order not found");
  }

  if (
    order.sellerId.toString() !== sellerId.toString() &&
    req.user.role !== "admin"
  ) {
    throw new ApiError(403, "Not authorized");
  }

  order.status = status;
  await order.save();

  if (status === "rejected") {
    await Product.findByIdAndUpdate(order.productId, {
      $set: { available: true },
    });
  }

  return res
    .status(200)
    .json(new ApiResponse(200, order, "Update order status"));
});
