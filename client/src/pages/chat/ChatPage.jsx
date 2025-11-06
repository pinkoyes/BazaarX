import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import { fetchMessages, sendMessageAPI } from "../../api/chat";
import { io } from "socket.io-client";
import { FiSend, FiArrowLeft, FiUser } from "react-icons/fi";
import Spinner from "../../components/ui/Spinner";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext"; // ✅ assume you have user context

const SOCKET_URL = import.meta.env.VITE_API_BASE_URL;

const ChatPage = () => {
  const { chatRoomId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth(); // ✅ current logged-in user
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

    // Optimistic UI
    const tempMsg = {
      _id: Date.now(),
      sender: { _id: user._id, fullName: user.fullName },
      content: message,
      createdAt: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, tempMsg]);
    setMessage("");

    sendMessageMutation.mutate(newMsg);
    socket.emit("sendMessage", {
      chatRoomId,
      content: message,
    });
  };

  if (isLoading) return <Spinner />;
  if (isError)
    return (
      <div className="flex justify-center items-center h-64 text-gray-500">
        Unable to load chat.
      </div>
    );

  return (
    <div className="flex justify-center min-h-screen bg-linear-to-b from-gray-50 via-gray-100 to-gray-200">
      <div className="flex flex-col w-full max-w-7xl bg-white shadow-lg rounded-xl overflow-hidden my-6 mx-2 sm:mx-6 lg:mx-8 border border-gray-100">
        {/* ===== Header ===== */}
        <div className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50 px-5 py-4 flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-full hover:bg-gray-100 transition"
          >
            <FiArrowLeft size={20} />
          </button>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <FiUser className="text-blue-600 text-xl" />
            </div>
            <div>
              <p className="font-semibold text-gray-800 text-sm">
                Chat Conversation
              </p>
              <p className="text-xs text-green-500">Online</p>
            </div>
          </div>
        </div>

        {/* ===== Messages ===== */}
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-4 bg-linear-to-b from-gray-50 to-gray-100 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
          {messages.length === 0 && (
            <div className="flex items-center justify-center h-full text-gray-400 text-sm italic">
              No messages yet. Start the conversation!
            </div>
          )}

          {messages.map((msg) => {
            const isMine = msg.sender?._id === user?._id; // ✅ check user
            return (
              <div
                key={msg._id}
                className={`flex ${isMine ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[70%] px-4 py-3 rounded-2xl text-sm shadow-sm transition-all duration-200 ${
                    isMine
                      ? "bg-blue-600 text-white rounded-br-none"
                      : "bg-gray-100 text-gray-800 border border-gray-200 rounded-bl-none"
                  }`}
                >
                  <p className="leading-snug whitespace-pre-line">
                    {msg.content}
                  </p>
                  <div
                    className={`text-[10px] mt-1 text-right ${
                      isMine ? "text-blue-100" : "text-gray-400"
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
        <div className="bg-gray-50 border-t border-gray-200 p-4 flex items-center gap-3 sticky bottom-0">
          <input
            type="text"
            placeholder="Type a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            className="flex-1 px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-sm placeholder-gray-400"
          />
          <button
            onClick={handleSend}
            disabled={sendMessageMutation.isPending}
            className="p-3 bg-blue-600 rounded-full text-white hover:bg-blue-700 active:scale-95 disabled:opacity-60 transition"
          >
            <FiSend size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
