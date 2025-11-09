import React from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { fetchMyOrders } from "../../api/order";
import { initiateChatRoom } from "../../api/chat";
import { useNavigate } from "react-router-dom";
import {
  FiPackage,
  FiMapPin,
  FiUser,
  FiCreditCard,
  FiClock,
  FiMessageCircle,
  FiCheckCircle,
  FiXCircle,
  FiAlertTriangle,
  FiBox,
  FiTruck,
} from "react-icons/fi";
import toast from "react-hot-toast";

const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  const date = new Date(dateString);
  return `${date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  })}, ${date.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  })}`;
};

const formatAddress = (address) => {
  if (!address) return "Not provided";
  const { street, city, state, pincode } = address;
  return [street, city, state, pincode].filter(Boolean).join(", ");
};

const getStatusBadge = (status) => {
  switch (status) {
    case "pending":
      return "bg-yellow-100 text-yellow-700";
    case "accepted":
      return "bg-blue-100 text-blue-700";
    case "purchased":
      return "bg-indigo-100 text-indigo-700";
    case "delivered":
      return "bg-green-100 text-green-700";
    case "cancelled":
    case "rejected":
      return "bg-red-100 text-red-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
};

const getStatusIcon = (status) => {
  switch (status) {
    case "accepted":
      return <FiCheckCircle className="text-blue-500" />;
    case "pending":
      return <FiAlertTriangle className="text-yellow-400" />;
    case "rejected":
      return <FiXCircle className="text-red-500" />;
    case "delivered":
      return <FiTruck className="text-green-600" />;
    case "cancelled":
      return <FiXCircle className="text-gray-500" />;
    default:
      return <FiClock className="text-gray-400" />;
  }
};

const MyOrders = () => {
  const navigate = useNavigate();

  // === Fetch User Orders ===
  const {
    data: orders = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["myOrders"],
    queryFn: fetchMyOrders,
    staleTime: 0,
  });

  // === Start Chat Mutation ===
  const chatMutation = useMutation({
    mutationFn: (data) => initiateChatRoom(data),
    onSuccess: (res) => {
      if (res?.chatRoom?._id) {
        navigate(`/chat/${res.chatRoom._id}`);
        toast.success("Chat started with seller!");
      } else {
        toast.error("Unexpected response from server");
      }
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || "Failed to start chat");
    },
  });

  const handleChatWithSeller = (productId) => {
    if (!productId) return toast.error("Invalid product ID");
    chatMutation.mutate({ productId });
  };

  if (isLoading)
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin h-10 w-10 border-4 border-gray-300 border-t-indigo-600 rounded-full"></div>
      </div>
    );

  if (isError || orders.length === 0)
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-gray-600 text-center px-4">
        <FiBox className="text-7xl mb-4 text-gray-400" />
        <h2 className="text-xl font-semibold">
          {error?.response?.data?.message || "No Orders Found"}
        </h2>
        <p className="text-sm text-gray-500 mt-2">
          You haven’t placed any orders yet.
        </p>
        <button
          onClick={() => refetch()}
          className="mt-6 px-5 py-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-all"
        >
          Retry
        </button>
      </div>
    );

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 via-white to-indigo-50 px-5 py-14 font-sans">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-extrabold text-gray-900 text-center mb-12 tracking-tight">
          🛍️ My Orders
        </h1>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {orders.map((order) => {
            const product = order.productId || {};
            const seller = order.sellerId || {};
            const isRejected =
              order.status === "rejected" || order.status === "cancelled";

            return (
              <div
                key={order._id}
                className="group bg-white/90 backdrop-blur-md border border-gray-200 rounded-3xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col"
              >
                {/* === Product Image === */}
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={
                      product.media?.[0]?.url ||
                      "https://via.placeholder.com/400x300?text=No+Image"
                    }
                    alt={product.title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-all duration-700"
                  />
                  <div
                    className={`absolute top-4 right-4 px-3 py-1.5 rounded-full text-xs font-semibold capitalize shadow-md ${getStatusBadge(
                      order.status
                    )}`}
                  >
                    {order.status}
                  </div>
                </div>

                {/* === Details === */}
                <div className="p-6 flex flex-col flex-1 justify-between">
                  {/* === Product Info === */}
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2 mb-2">
                      <FiPackage className="text-indigo-500" />
                      {product.title || "Untitled Product"}
                    </h2>

                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {product.description || "No description available."}
                    </p>

                    <p className="text-indigo-600 font-bold text-xl">
                      ₹{order.priceAtPurchase?.toLocaleString("en-IN")}
                    </p>
                  </div>

                  {/* === Meta Info === */}
                  <div className="mt-5 space-y-3 text-sm text-gray-700">
                    <div className="flex items-start gap-2">
                      <FiUser className="text-indigo-500 mt-0.5" />
                      <span>
                        <strong>Seller:</strong>{" "}
                        {seller.fullName || "Unknown Seller"}
                      </span>
                    </div>
                    <div className="flex items-start gap-2">
                      <FiMapPin className="text-indigo-500 mt-0.5" />
                      <span>
                        <strong>Delivery:</strong>{" "}
                        {formatAddress(order.deliveryAddress)}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FiCreditCard className="text-indigo-500" />
                      <span>
                        <strong>Payment:</strong>{" "}
                        {order.paymentInfo?.provider?.toUpperCase()} (
                        {order.paymentStatus})
                      </span>
                    </div>
                  </div>

                  {/* === Timeline Info === */}
                  <div className="mt-5 text-xs text-gray-500 space-y-1">
                    <p>📦 Placed: {formatDate(order.timeline?.placedAt)}</p>
                    {order.timeline?.acceptedAt && (
                      <p>
                        ✅ Accepted: {formatDate(order.timeline?.acceptedAt)}
                      </p>
                    )}
                    {order.timeline?.deliveredAt && (
                      <p>
                        🚚 Delivered: {formatDate(order.timeline?.deliveredAt)}
                      </p>
                    )}
                    {order.timeline?.cancelledAt && (
                      <p>
                        ❌ Cancelled: {formatDate(order.timeline?.cancelledAt)}
                      </p>
                    )}
                  </div>

                  <div className="my-5 border-t border-gray-100"></div>

                  {/* === Chat Button === */}
                  <button
                    onClick={() =>
                      !isRejected && handleChatWithSeller(product._id)
                    }
                    disabled={isRejected || chatMutation.isPending}
                    className={`w-full flex items-center justify-center gap-2 px-4 py-2 rounded-full text-sm font-medium shadow-md transition-all duration-200 cursor-pointer ${
                      isRejected
                        ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                        : "bg-linear-to-r from-indigo-600 to-blue-600 text-white hover:shadow-lg hover:scale-[1.02] disabled:opacity-70"
                    }`}
                  >
                    <FiMessageCircle />
                    {isRejected
                      ? "Order Rejected"
                      : chatMutation.isPending
                      ? "Connecting..."
                      : "Chat with Seller"}
                  </button>
                </div>

                {/* === Footer === */}
                <div className="bg-gray-50 border-t border-gray-100 px-6 py-3 flex items-center justify-between text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(order.status)}
                    <span className="capitalize">{order.status}</span>
                  </div>
                  <span className="text-xs italic">
                    #{order._id.slice(-6).toUpperCase()}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MyOrders;
