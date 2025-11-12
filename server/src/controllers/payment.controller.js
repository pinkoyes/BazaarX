import crypto from "crypto";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Order } from "../models/order.model.js";
import { Product } from "../models/product.model.js";

export const verifyPayment = asyncHandler(async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;

  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
    throw new ApiError(400, "Missing payment details");
  }

  // ✅ Generate expected signature securely
  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_SECRET)
    .update(body.toString())
    .digest("hex");

  if (expectedSignature !== razorpay_signature) {
    throw new ApiError(400, "Invalid payment signature");
  }

  // ✅ Find the matching order
  const order = await Order.findOne({
    "paymentInfo.orderId": razorpay_order_id,
  });
  if (!order) throw new ApiError(404, "Order not found");

  // ✅ Update order & product
  order.paymentStatus = "paid";
  order.status = "purchased";
  order.paymentInfo.paymentId = razorpay_payment_id;
  order.paymentInfo.signature = razorpay_signature;
  order.timeline.paidAt = new Date();
  await order.save();

  await Product.findByIdAndUpdate(order.productId, { available: false });

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        order,
        "Payment verified successfully and product marked as unavailable"
      )
    );
});
