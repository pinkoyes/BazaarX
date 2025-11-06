// index.js
import "dotenv/config";
import app from "./app.js";
import connectDB from "./config/db.js";
import http from "http";
import { Server } from "socket.io";
import { Message } from "./models/message.model.js";
import { ChatRoom } from "./models/chatRoom.model.js";

const PORT = process.env.PORT || 8000;

// create HTTP server to attach socket.io
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_ORIGIN,
    credentials: true,
  },
});

// Socket.io event listeners
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("joinRoom", (roomId) => {
    socket.join(roomId);
  });

  socket.on("sendMessage", async ({ chatRoomId, senderId, content, type }) => {
    try {
      const message = await Message.create({
        chatRoom: chatRoomId,
        sender: senderId,
        content,
        type: type || "text",
      });

      await ChatRoom.findByIdAndUpdate(chatRoomId, {
        lastMessage: content,
        lastMessageTime: new Date(),
      });

      io.to(chatRoomId).emit("newMessage", message);
    } catch (err) {
      console.error("Error sending message:", err.message);
    }
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

// Connect to MongoDB and start server
connectDB()
  .then(() => {
    server.listen(PORT, () => {
      console.log(`Server running on PORT: ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("Error while connecting with MongoDB", err);
    process.exit(1);
  });
