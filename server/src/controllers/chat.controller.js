import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ChatRoom } from "../models/chatRoom.model.js";
import { Message } from "../models/message.model.js";
import { Product } from "../models/product.model.js";

export const createOrGetChatRoom = asyncHandler(async (req, res) => {
  const { productId } = req.body;
  const buyerId = req.user?._id;

  const product = await Product.findById(productId);

  if (!product) {
    throw new ApiError(404, "Product not found");
  }

  const sellerId = product.ownerId;

  if (buyerId.toString() === sellerId.toString()) {
    throw new ApiError(400, "Cannot chat with yourself");
  }

  let chatRoom = await ChatRoom.findOne({
    participants: { $all: [buyerId, sellerId] },
    product: productId,
  });

  if (!chatRoom) {
    chatRoom = await ChatRoom.create({
      participants: [buyerId, sellerId],
      product: productId,
    });
  }

  return res
    .status(200)
    .json(new ApiResponse(200, chatRoom, "Chat create successfully!"));
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

  const chatRooms = await ChatRoom.find({ participants: userId })
    .populate("product", "title media price")
    .populate("participants", "fullName profileImage")
    .sort({ updatedAt: -1 });

  return res
    .status(200)
    .json(new ApiResponse(200, chatRooms, "get user charts"));
});
