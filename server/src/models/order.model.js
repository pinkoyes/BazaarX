import mongoose from "mongoose";

export const orderSchema = new mongoose.Schema(
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
    },
    status: {
      type: String,
      enum: ["pending", "rejected", "completed"],
      default: "pending",
    },
    paymentStatus: {
      type: String,
      enum: ["unpaid", "paid"],
    },
    totalAmmount: Number,
    deliveryAddress: {
      street: String,
      city: String,
      state: String,
      pincode: String,
    },
  },
  { timestamps: true }
);

export default Order = mongoose.model("Order", orderSchema);
