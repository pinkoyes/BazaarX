import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Product } from "../models/product.model.js";
import { Order } from "../models/order.model.js";
import { razorpayInstance } from "../config/razorpay.js";

export const placeOrder = asyncHandler(async (req, res) => {
  const { productId, deliveryAddress, paymentMethod } = req.body;
  const buyerId = req.user._id;

  const product = await Product.findById(productId).populate("ownerId");
  if (!product) {
    throw new ApiError(404, "Product not found");
  }
  if (!product.available) {
    throw new ApiError(400, "Product is already sold");
  }

  if (product.ownerId._id.toString() === buyerId.toString()) {
    throw new ApiError(400, "You cannot buy your own product");
  }

  const order = await Order.create({
    productId,
    buyerId,
    sellerId: product.ownerId._id,
    priceAtPurchase: product.price,
    paymentStatus: "unpaid",
    paymentInfo: {
      provider: paymentMethod || "cod",
    },
    deliveryAddress,
    status: "pending",
  });

  return res
    .status(201)
    .json(new ApiResponse(201, order, "Order request sent to seller"));
});

export const myOrders = asyncHandler(async (req, res) => {
  const buyerId = req.user._id;

  const orders = await Order.find({ buyerId })
    .populate("productId")
    .populate("sellerId", "fullName email phoneNumber");

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        orders || [],
        orders.length ? "Fetched your orders" : "No orders found"
      )
    );
});

export const sellerOrders = asyncHandler(async (req, res) => {
  const sellerId = req.user._id;

  const orders = await Order.find({ sellerId })
    .populate("productId")
    .populate("buyerId", "fullName email phoneNumber");

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        orders || [],
        orders.length ? "Fetched seller orders" : "No orders yet"
      )
    );
});

export const updateOrderStatus = asyncHandler(async (req, res) => {
  const { orderId } = req.params;
  const { status } = req.body;
  const sellerId = req.user._id;

  const order = await Order.findById(orderId).populate(
    "buyerId",
    "fullName email phoneNumber"
  );
  if (!order) throw new ApiError(404, "Order not found");

  if (
    order.sellerId.toString() !== sellerId.toString() &&
    req.user.role !== "admin"
  ) {
    throw new ApiError(403, "Not authorized to update this order");
  }

  if (["rejected", "delivered", "cancelled"].includes(order.status)) {
    throw new ApiError(400, `Cannot update order once it's ${order.status}`);
  }

  switch (status) {
    case "accepted": {
      order.status = "accepted";
      order.timeline.acceptedAt = new Date();

      if (order.paymentInfo.provider === "online") {
        order.paymentStatus = "awaiting_payment";

        const amountInPaise = Math.round(order.priceAtPurchase);

        const razorpayOrder = await razorpayInstance.orders.create({
          amount: amountInPaise,
          currency: "INR",
          receipt: `order_rcptid_${order._id}`,
          notes: {
            product: order.productId?.toString() || "N/A",
            buyer: order.buyerId.fullName,
          },
        });

        order.paymentInfo.orderId = razorpayOrder.id;
        order.paymentInfo.provider = "online";
        await order.save();

        return res.status(200).json(
          new ApiResponse(
            200,
            {
              order,
              razorpayOrder,
            },
            "Order accepted — Razorpay Order created for buyer"
          )
        );
      }

      // 💵 COD Case
      else {
        order.paymentStatus = "unpaid";
        await order.save();
        return res
          .status(200)
          .json(
            new ApiResponse(
              200,
              order,
              "Order accepted — product will be delivered via COD"
            )
          );
      }
    }

    case "rejected": {
      order.status = "rejected";
      order.paymentStatus = "failed";
      order.timeline.cancelledAt = new Date();
      await order.save();
      return res
        .status(200)
        .json(new ApiResponse(200, order, "Order request rejected"));
    }

    default:
      throw new ApiError(400, "Invalid order status update");
  }
});

export const getOrderById = asyncHandler(async (req, res) => {
  const { orderId } = req.params;

  const order = await Order.findById(orderId)
    .populate("productId")
    .populate("buyerId", "fullName email")
    .populate("sellerId", "fullName email");

  if (!order) throw new ApiError(404, "Order not found");

  return res
    .status(200)
    .json(new ApiResponse(200, order, "Fetched order successfully"));
});
