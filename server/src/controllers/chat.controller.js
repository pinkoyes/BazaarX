import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ChatRoom } from "../models/chatRoom.model.js";
import { Message } from "../models/message.model.js";
import { Product } from "../models/product.model.js";

export const createOrGetChatRoom = asyncHandler(async (req, res) => {
  const { productId, buyerId: buyerFromBody } = req.body;
  const userId = req.user?._id;

  if (!productId) throw new ApiError(400, "Product ID is required");

  const product = await Product.findById(productId);
  if (!product) throw new ApiError(404, "Product not found");

  const sellerId = product.ownerId;
  let buyerId;

  if (userId.toString() === sellerId.toString()) {
    if (!buyerFromBody)
      throw new ApiError(400, "Buyer ID required when seller starts chat");
    buyerId = buyerFromBody;
  } else {
    buyerId = userId;
  }

  if (buyerId.toString() === sellerId.toString()) {
    throw new ApiError(400, "Cannot chat with yourself");
  }

  // 🔍 Find existing chat
  let chatRoom = await ChatRoom.findOne({
    buyer: buyerId,
    seller: sellerId,
    product: productId,
  });

  if (!chatRoom) {
    try {
      chatRoom = await ChatRoom.create({
        buyer: buyerId,
        seller: sellerId,
        product: productId,
      });
    } catch (error) {
      // Gracefully handle race condition duplicate
      if (error.code === 11000) {
        chatRoom = await ChatRoom.findOne({
          buyer: buyerId,
          seller: sellerId,
          product: productId,
        });
      } else {
        throw error;
      }
    }
  }

  return res
    .status(200)
    .json(new ApiResponse(200, { chatRoom }, "Chat room ready"));
});

export const sendMessage = asyncHandler(async (req, res) => {
  const { chatRoomId, content, type } = req.body;

  const message = await Message.create({
    chatRoom: chatRoomId,
    sender: req.user?._id,
    content,
    type: type || "text",
  });

  await ChatRoom.findByIdAndUpdate(chatRoomId, {
    lastMessage: content,
    lastMessageTime: new Date(),
  });

  return res
    .status(200)
    .json(new ApiResponse(200, message, "Message created successfully!"));
});

export const getMessages = asyncHandler(async (req, res) => {
  const { chatRoomId } = req.params;

  const messages = await Message.find({ chatRoom: chatRoomId })
    .populate("sender", "fullName profileImage")
    .sort({ createdAt: 1 });

  return res
    .status(200)
    .json(new ApiResponse(200, messages, "get all messages"));
});

export const getUserCharts = asyncHandler(async (req, res) => {
  const userId = req.user?._id;

  const chatRooms = await ChatRoom.find({
    $or: [{ buyer: userId }, { seller: userId }],
  })
    .populate("product", "title media price")
    .populate("buyer", "fullName profileImage")
    .populate("seller", "fullName profileImage")
    .sort({ updatedAt: -1 });

  return res
    .status(200)
    .json(new ApiResponse(200, chatRooms, "User chat rooms fetched"));
});
