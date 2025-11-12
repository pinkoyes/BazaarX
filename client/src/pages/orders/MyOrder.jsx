import React, { useEffect, useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { fetchMyOrders } from "../../api/order";
import { initiateChatRoom } from "../../api/chat";
import { verifyPayment } from "../../api/payment"; // ✅ New API helper
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  FiPackage,
  FiUser,
  FiCreditCard,
  FiClock,
  FiMessageCircle,
  FiCheckCircle,
  FiXCircle,
  FiAlertTriangle,
  FiBox,
  FiTruck,
  FiExternalLink,
} from "react-icons/fi";

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

const getStatusStyle = (status) => {
  const styles = {
    pending: "bg-amber-100 text-amber-700 border-amber-300",
    accepted: "bg-blue-100 text-blue-700 border-blue-300",
    purchased: "bg-indigo-100 text-indigo-700 border-indigo-300",
    delivered: "bg-emerald-100 text-emerald-700 border-emerald-300",
    rejected: "bg-rose-100 text-rose-700 border-rose-300",
    cancelled: "bg-gray-100 text-gray-600 border-gray-300",
  };
  return styles[status] || "bg-gray-100 text-gray-700 border-gray-300";
};

const getStatusIcon = (status) => {
  switch (status) {
    case "accepted":
      return <FiCheckCircle className="text-blue-500" />;
    case "pending":
      return <FiAlertTriangle className="text-amber-500" />;
    case "rejected":
      return <FiXCircle className="text-rose-500" />;
    case "delivered":
      return <FiTruck className="text-emerald-600" />;
    case "cancelled":
      return <FiXCircle className="text-gray-500" />;
    default:
      return <FiClock className="text-gray-400" />;
  }
};

const MyOrders = () => {
  const navigate = useNavigate();
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Load Razorpay SDK once
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  // Fetch orders
  const {
    data: orders = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["myOrders"],
    queryFn: fetchMyOrders,
  });

  // Chat logic
  const chatMutation = useMutation({
    mutationFn: (data) => initiateChatRoom(data),
    onSuccess: (res) => {
      if (res?.chatRoom?._id) {
        navigate(`/chat/${res.chatRoom._id}`);
        toast.success("Chat started successfully!");
      } else toast.error("Unexpected response from server");
    },
    onError: (err) =>
      toast.error(err?.response?.data?.message || "Failed to start chat"),
  });

  // 💳 Handle Razorpay Payment
  const handleProceedPayment = async () => {
    const order = selectedOrder;
    if (!order?.paymentInfo?.orderId) {
      toast.error("No Razorpay order found");
      return;
    }

    if (!window.Razorpay) {
      toast.error("Razorpay SDK not loaded yet. Try again.");
      return;
    }

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.priceAtPurchase * 100,
      currency: "INR",
      name: "BazaarX",
      description: `Payment for ${order.productId?.title}`,
      order_id: order.paymentInfo.orderId,
      handler: async (response) => {
        try {
          await verifyPayment({
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
          });
          toast.success("Payment successful!");
          setSelectedOrder(null);
          refetch();
        } catch (err) {
          toast.error("Payment verification failed!");
        }
      },
      prefill: {
        name: order.buyerId?.fullName || "Buyer",
        email: order.buyerId?.email || "",
      },
      theme: { color: "#4f46e5" },
    };

    new window.Razorpay(options).open();
  };

  // Loading and empty states
  if (isLoading)
    return (
      <div className="flex justify-center items-center min-h-[60vh] text-indigo-600">
        <div className="animate-spin h-10 w-10 border-4 border-gray-300 border-t-indigo-600 rounded-full"></div>
      </div>
    );

  if (isError || orders.length === 0)
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-gray-600 text-center">
        <FiBox className="text-6xl mb-4 text-gray-400" />
        <h2 className="text-lg font-semibold">
          {error?.response?.data?.message || "No Orders Found"}
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          You haven’t placed any orders yet.
        </p>
        <button
          onClick={() => refetch()}
          className="mt-5 px-5 py-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-all cursor-pointer"
        >
          Refresh
        </button>
      </div>
    );

  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-50 via-white to-violet-50 px-6 py-14">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-12">
          🛍️ My Orders
        </h1>

        <div className="grid gap-10 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {orders.map((order) => {
            const product = order.productId || {};
            const seller = order.sellerId || {};
            const isRejected =
              order.status === "rejected" || order.status === "cancelled";

            return (
              <div
                key={order._id}
                className="relative group bg-white border border-gray-200 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col"
              >
                {/* Product Image */}
                <div
                  className="relative h-56 overflow-hidden cursor-pointer"
                  onClick={() =>
                    window.open(`/product/${product._id}`, "_blank")
                  }
                >
                  <img
                    src={
                      product.media?.[0]?.url ||
                      "https://via.placeholder.com/400x300?text=No+Image"
                    }
                    alt={product.title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-all duration-700"
                  />
                  <div
                    className={`absolute top-4 right-4 px-3 py-1.5 border rounded-full text-xs font-semibold capitalize shadow-sm flex items-center gap-1 ${getStatusStyle(
                      order.status
                    )}`}
                  >
                    {getStatusIcon(order.status)} {order.status}
                  </div>
                </div>

                {/* Order Info */}
                <div className="p-6 flex flex-col flex-1 justify-between">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2 mb-2">
                      <FiPackage className="text-indigo-500" />
                      {product.title || "Untitled Product"}
                    </h2>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                      {product.description || "No description available."}
                    </p>
                    <p className="text-indigo-600 font-bold text-xl mb-3">
                      ₹{order.priceAtPurchase?.toLocaleString("en-IN")}
                    </p>
                  </div>

                  <div className="text-sm text-gray-700 space-y-2">
                    <p className="flex items-center gap-2">
                      <FiUser className="text-indigo-500" />
                      <strong>Seller:</strong> {seller.fullName || "Unknown"}
                    </p>
                    <p className="flex items-center gap-2">
                      <FiCreditCard className="text-indigo-500" />
                      <strong>Payment:</strong>{" "}
                      {order.paymentInfo?.provider?.toUpperCase()} (
                      {order.paymentStatus})
                    </p>
                  </div>

                  <div className="mt-6 flex flex-col gap-2">
                    {/* Chat */}
                    <button
                      onClick={() =>
                        !isRejected &&
                        chatMutation.mutate({ productId: product._id })
                      }
                      disabled={isRejected || chatMutation.isPending}
                      className={`w-full flex items-center justify-center gap-2 px-4 py-2 rounded-full text-sm font-medium shadow-md transition-all ${
                        isRejected
                          ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                          : "bg-linear-to-r from-indigo-600 to-blue-600 text-white hover:shadow-lg"
                      }`}
                    >
                      <FiMessageCircle />
                      {isRejected
                        ? "Order Rejected"
                        : chatMutation.isPending
                        ? "Connecting..."
                        : "Chat with Seller"}
                    </button>

                    {/* Pay Now */}
                    {order.paymentInfo?.provider === "online" &&
                      order.paymentStatus === "awaiting_payment" && (
                        <button
                          onClick={() => setSelectedOrder(order)}
                          className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-full text-sm font-medium bg-green-600 text-white hover:bg-green-700 transition-all cursor-pointer"
                        >
                          <FiExternalLink /> Pay Now
                        </button>
                      )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ✅ Razorpay Payment Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full relative">
            <button
              onClick={() => setSelectedOrder(null)}
              className="absolute top-3 right-4 text-gray-500 hover:text-gray-700 cursor-pointer"
            >
              ✕
            </button>
            <h3 className="text-xl font-semibold text-gray-800 mb-2 text-center">
              Pay for {selectedOrder.productId?.title}
            </h3>
            <p className="text-gray-600 text-center mb-6">
              Amount:{" "}
              <span className="font-semibold text-indigo-600">
                ₹{selectedOrder.priceAtPurchase}
              </span>
            </p>

            <button
              onClick={handleProceedPayment}
              className="w-full bg-indigo-600 text-white py-2.5 rounded-full hover:bg-indigo-700 transition-all cursor-pointer"
            >
              Proceed to Pay via Razorpay
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyOrders;
