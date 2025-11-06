import express from "express";
import { protect } from "../middlewares/auth.middleware.js";
import {
  createOrGetChatRoom,
  sendMessage,
  getMessages,
  getUserCharts,
} from "../controllers/chat.controller.js";

const router = express.Router();

router.post("/room", protect, createOrGetChatRoom);
router.post("/message", protect, sendMessage);
router.get("/messages/:chatRoomId", protect, getMessages);
router.get("/rooms", protect, getUserCharts);

export default router;
