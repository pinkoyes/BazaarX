import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { fetchSellerOrders, updateOrderStatus } from "../../api/order";
import { initiateChatRoom } from "../../api/chat";
import {
  FiPackage,
  FiUser,
  FiMapPin,
  FiMail,
  FiPhone,
  FiCreditCard,
  FiCheck,
  FiX,
  FiMessageSquare,
  FiClock,
  FiTruck,
  FiAlertTriangle,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";

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

const getStatusColor = (status) => {
  const styles = {
    accepted: "bg-blue-100 text-blue-700 border-blue-300",
    rejected: "bg-rose-100 text-rose-700 border-rose-300",
    delivered: "bg-green-100 text-green-700 border-green-300",
    pending: "bg-amber-100 text-amber-700 border-amber-300",
    cancelled: "bg-gray-100 text-gray-600 border-gray-300",
  };
  return styles[status] || "bg-gray-100 text-gray-700 border-gray-300";
};

const getStatusIcon = (status) => {
  switch (status) {
    case "accepted":
      return <FiCheck className="text-blue-500" />;
    case "pending":
      return <FiAlertTriangle className="text-amber-500" />;
    case "rejected":
      return <FiX className="text-rose-500" />;
    case "delivered":
      return <FiTruck className="text-green-600" />;
    default:
      return <FiClock className="text-gray-500" />;
  }
};

const SellerRequests = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  // === Fetch Seller Orders ===
  const {
    data: orders = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["sellerRequests"],
    queryFn: fetchSellerOrders,
  });

  // === Accept / Reject Order ===
  const mutation = useMutation({
    mutationFn: ({ orderId, status }) => updateOrderStatus(orderId, status),
    onSuccess: () => {
      toast.success("Order status updated successfully!");
      queryClient.invalidateQueries(["sellerRequests"]);
    },
    onError: (err) =>
      toast.error(err?.response?.data?.message || "Failed to update order!"),
  });

  // === Chat with Buyer ===
  const chatMutation = useMutation({
    mutationFn: ({ productId, buyerId }) =>
      initiateChatRoom({ productId, buyerId }),
    onSuccess: (data) => {
      if (data?.chatRoom?._id) {
        navigate(`/chat/${data.chatRoom._id}`);
        toast.success("Chat started with buyer!");
      } else toast.error("Unexpected response from server");
    },
    onError: (error) =>
      toast.error(
        error?.response?.data?.message || "Failed to start chat with buyer."
      ),
  });

  // === Loading States ===
  if (isLoading)
    return (
      <div className="flex justify-center items-center min-h-[60vh] text-indigo-600">
        <div className="animate-spin h-10 w-10 border-4 border-gray-300 border-t-indigo-600 rounded-full"></div>
      </div>
    );

  if (isError)
    return (
      <div className="flex justify-center items-center min-h-[60vh] text-red-500 text-lg">
        Error: {error.message}
      </div>
    );

  if (!orders || orders.length === 0)
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-gray-600 text-center">
        <FiPackage className="text-6xl mb-4 text-gray-400" />
        <h2 className="text-xl font-semibold">No customer requests found.</h2>
        <p className="text-sm text-gray-500 mt-1">
          You currently have no new orders.
        </p>
      </div>
    );

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 via-white to-indigo-50 py-14 px-6 font-sans">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-14">
          🧾 Customer Order Requests
        </h1>

        <div className="grid gap-10 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {orders.map((order) => {
            const product = order.productId || {};
            const buyer = order.buyerId || {};

            return (
              <div
                key={order._id}
                className="relative bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 p-6 flex flex-col"
              >
                {/* Floating Status */}
                <div
                  className={`absolute top-4 z-40 right-4 px-3 py-1.5 rounded-full text-xs font-semibold capitalize shadow-sm flex items-center gap-1 border ${getStatusColor(
                    order.status
                  )}`}
                >
                  {getStatusIcon(order.status)} {order.status}
                </div>

                {/* Product Image */}
                <div
                  className="overflow-hidden rounded-2xl mb-5 cursor-pointer"
                  onClick={() =>
                    window.open(`/product/${product._id}`, "_blank")
                  }
                >
                  <img
                    src={
                      product.media?.[0]?.url ||
                      "https://via.placeholder.com/400x250?text=No+Image"
                    }
                    alt={product.title}
                    className="w-full h-52 object-cover transform hover:scale-105 transition-all duration-500"
                  />
                </div>

                {/* Product Info */}
                <div className="flex flex-col flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 flex items-center gap-2 mb-2">
                    <FiPackage className="text-indigo-500" />
                    {product.title || "Untitled Product"}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                    {product.description || "No description available."}
                  </p>
                  <p className="text-2xl font-bold text-indigo-600 mb-4">
                    ₹{order.priceAtPurchase.toLocaleString("en-IN")}
                  </p>

                  {/* Buyer Info */}
                  <div className="bg-slate-50 rounded-2xl p-4 shadow-inner mb-4 space-y-2 text-sm text-gray-700">
                    <p className="flex items-center gap-2">
                      <FiUser className="text-indigo-500" />
                      <strong>{buyer.fullName || "Unknown Buyer"}</strong>
                    </p>
                    {buyer.email && (
                      <p className="flex items-center gap-2">
                        <FiMail className="text-indigo-500" />
                        {buyer.email}
                      </p>
                    )}
                    {buyer.phoneNumber && (
                      <p className="flex items-center gap-2">
                        <FiPhone className="text-indigo-500" />
                        {buyer.phoneNumber}
                      </p>
                    )}
                    <p className="flex items-center gap-2">
                      <FiCreditCard className="text-indigo-500" />
                      <span className="capitalize">
                        {order.paymentInfo?.provider || "N/A"} (
                        {order.paymentStatus})
                      </span>
                    </p>
                    <p className="flex items-start gap-2">
                      <FiMapPin className="text-indigo-500 mt-0.5" />
                      <span>
                        {order.deliveryAddress
                          ? `${order.deliveryAddress.street}, ${order.deliveryAddress.city}, ${order.deliveryAddress.state} - ${order.deliveryAddress.pincode}`
                          : "Address not provided"}
                      </span>
                    </p>
                  </div>

                  {/* Timeline */}
                  <div className="text-xs text-gray-500 mb-4">
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
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col gap-3 mt-auto">
                    {order.status === "pending" ? (
                      <div className="flex gap-3">
                        <button
                          disabled={mutation.isPending}
                          onClick={() =>
                            mutation.mutate({
                              orderId: order._id,
                              status: "accepted",
                            })
                          }
                          className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2.5 rounded-xl font-semibold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                        >
                          <FiCheck /> Accept
                        </button>
                        <button
                          disabled={mutation.isPending}
                          onClick={() =>
                            mutation.mutate({
                              orderId: order._id,
                              status: "rejected",
                            })
                          }
                          className="flex-1 bg-rose-600 hover:bg-rose-700 text-white py-2.5 rounded-xl font-semibold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                        >
                          <FiX /> Reject
                        </button>
                      </div>
                    ) : (
                      <p className="text-sm text-gray-600 font-medium italic text-center">
                        Status: {order.status}
                      </p>
                    )}

                    <button
                      onClick={() =>
                        chatMutation.mutate({
                          productId: product._id,
                          buyerId: buyer._id,
                        })
                      }
                      disabled={chatMutation.isPending}
                      className="flex items-center justify-center gap-2 bg-white border border-indigo-500 text-indigo-600 hover:bg-indigo-50 font-semibold px-4 py-2.5 rounded-xl shadow-sm transition-all cursor-pointer"
                    >
                      <FiMessageSquare />
                      {chatMutation.isPending
                        ? "Starting Chat..."
                        : "Chat with Buyer"}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SellerRequests;
