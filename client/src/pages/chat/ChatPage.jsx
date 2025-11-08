import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import { fetchMessages, sendMessageAPI } from "../../api/chat";
import { io } from "socket.io-client";
import { FiSend, FiArrowLeft, FiUser } from "react-icons/fi";
import Spinner from "../../components/ui/Spinner";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";

const SOCKET_URL = import.meta.env.VITE_API_BASE_URL;

const ChatPage = () => {
  const { chatRoomId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [socket, setSocket] = useState(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const scrollRef = useRef(null);

  // === Fetch messages ===
  const { data, isLoading, isError } = useQuery({
    queryKey: ["chatMessages", chatRoomId],
    queryFn: () => fetchMessages(chatRoomId),
  });

  // === Send message mutation ===
  const sendMessageMutation = useMutation({
    mutationFn: (newMessage) => sendMessageAPI(newMessage),
    onError: () => toast.error("Failed to send message"),
  });

  // === Setup socket.io ===
  useEffect(() => {
    const newSocket = io(SOCKET_URL, {
      withCredentials: true,
      transports: ["websocket"],
    });
    setSocket(newSocket);

    newSocket.emit("joinRoom", chatRoomId);
    newSocket.on("newMessage", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => newSocket.disconnect();
  }, [chatRoomId]);

  // Load messages
  useEffect(() => {
    if (data) setMessages(data);
  }, [data]);

  // Auto scroll
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Handle send
  const handleSend = () => {
    if (!message.trim()) return;
    const newMsg = { chatRoomId, content: message.trim() };

    const tempMsg = {
      _id: Date.now(),
      sender: { _id: user._id, fullName: user.fullName },
      content: message,
      createdAt: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, tempMsg]);
    setMessage("");

    sendMessageMutation.mutate(newMsg);
    socket.emit("sendMessage", newMsg);
  };

  if (isLoading) return <Spinner />;
  if (isError)
    return (
      <div className="flex justify-center items-center h-64 text-gray-500">
        Unable to load chat.
      </div>
    );

  return (
    <div className="h-[90vh] bg-linear-to-br from-gray-100 via-white to-indigo-50 flex justify-center py-6 sm:py-10">
      <div className="w-full max-w-5xl flex flex-col rounded-3xl shadow-2xl bg-white/90 backdrop-blur-md border border-gray-100 overflow-hidden">
        {/* ===== Header ===== */}
        <div className="bg-linear-to-r from-indigo-600 to-blue-600 text-white flex items-center gap-4 px-6 py-4 shadow-md sticky top-0 z-50">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition"
          >
            <FiArrowLeft size={20} />
          </button>
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-white/20 flex items-center justify-center">
              <FiUser className="text-white text-xl" />
            </div>
            <div>
              <h2 className="font-semibold text-lg leading-tight">
                Chat with Seller
              </h2>
              <p className="text-xs text-blue-100">Online</p>
            </div>
          </div>
        </div>

        {/* ===== Messages Section ===== */}
        <div
          className="flex-1 overflow-y-auto px-6 py-8 space-y-5 bg-linear-to-b from-white to-gray-100 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent"
          style={{ maxHeight: "calc(100vh - 180px)" }}
        >
          {messages.length === 0 && (
            <div className="flex items-center justify-center h-full text-gray-400 italic text-sm">
              No messages yet. Start the conversation!
            </div>
          )}

          {messages.map((msg) => {
            const isMine = msg.sender?._id === user?._id;
            return (
              <div
                key={msg._id}
                className={`flex ${isMine ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[75%] px-5 py-3.5 rounded-2xl shadow-sm transition-all duration-300 wrap-break-word ${
                    isMine
                      ? "bg-linear-to-r from-indigo-600 to-blue-600 text-white rounded-br-none"
                      : "bg-white border border-gray-200 text-gray-900 rounded-bl-none"
                  }`}
                >
                  <p className="text-[15px] leading-relaxed whitespace-pre-line">
                    {msg.content}
                  </p>
                  <div
                    className={`text-[11px] mt-1 text-right ${
                      isMine ? "text-blue-100" : "text-gray-500"
                    }`}
                  >
                    {new Date(msg.createdAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                </div>
              </div>
            );
          })}
          <div ref={scrollRef}></div>
        </div>

        {/* ===== Input Section ===== */}
        <div className="bg-white/85 backdrop-blur-md border-t border-gray-200 px-5 py-4 flex items-center gap-3 sticky bottom-0 z-50">
          <input
            type="text"
            placeholder="Type a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            className="flex-1 px-5 py-3 text-base rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-50 placeholder-gray-500 text-gray-900"
          />
          <button
            onClick={handleSend}
            disabled={sendMessageMutation.isPending}
            className="p-3 bg-linear-to-r from-indigo-600 to-blue-600 rounded-full text-white shadow-md hover:shadow-lg hover:scale-105 active:scale-95 disabled:opacity-60 transition-all"
          >
            <FiSend size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
