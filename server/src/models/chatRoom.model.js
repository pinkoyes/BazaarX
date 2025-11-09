import mongoose from "mongoose";

const chatRoomSchema = new mongoose.Schema(
  {
    buyer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    lastMessage: String,
    lastMessageTime: Date,
  },
  { timestamps: true }
);

chatRoomSchema.index({ buyer: 1, seller: 1, product: 1 }, { unique: true });

export const ChatRoom = mongoose.model("ChatRoom", chatRoomSchema);
