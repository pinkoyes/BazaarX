import mongoose from "mongoose";

const chatRoomSchema = new mongoose.Schema(
  {
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    ],
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true, // every chat is linked to a product
    },
    lastMessage: {
      type: String,
      default: "",
    },
    lastMessageTime: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

chatRoomSchema.index({ participants: 1, product: 1 }, { unique: true });

export const ChatRoom = mongoose.model("ChatRoom", chatRoomSchema);
