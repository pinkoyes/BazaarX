import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    buyerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    sellerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    priceAtPurchase: {
      type: Number,
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ["unpaid", "awaiting_payment", "paid", "failed"],
      default: "unpaid",
      required: true,
    },
    paymentInfo: {
      provider: {
        type: String,
        enum: ["online", "cod"],
        default: "cod",
      },
      orderId: { type: String },
      paymentId: { type: String },
      signature: { type: String },
    },
    status: {
      type: String,
      enum: [
        "pending",
        "accepted",
        "rejected",
        "purchased",
        "delivered",
        "cancelled",
      ],
      default: "pending",
    },
    deliveryAddress: {
      street: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      pincode: { type: String, required: true },
    },
    transactionRef: {
      type: String,
      default: null,
    },
    timeline: {
      placedAt: { type: Date, default: Date.now },
      acceptedAt: { type: Date },
      paidAt: { type: Date },
      deliveredAt: { type: Date },
      cancelledAt: { type: Date },
    },
  },
  { timestamps: true }
);

export const Order = mongoose.model("Order", orderSchema);
