import api from "./api";

export const initiateChatRoom = async ({ productId, buyerId }) => {
  if (!productId) throw new Error("productId is required");

  const body = buyerId ? { productId, buyerId } : { productId };

  const res = await api.post("/chat/room", body);
  return res.data?.data;
};

export const fetchMessages = async (chatRoomId) => {
  if (!chatRoomId) throw new Error("chatRoomId is required");

  const res = await api.get(`/chat/messages/${chatRoomId}`);
  return res.data?.data;
};

export const sendMessageAPI = async ({ chatRoomId, content }) => {
  if (!chatRoomId || !content)
    throw new Error("chatRoomId and content are required");

  const res = await api.post("/chat/message", { chatRoomId, content });
  return res.data?.data;
};
