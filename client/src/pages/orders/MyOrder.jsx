import { useQuery, useMutation } from "@tanstack/react-query";
import { myOrders } from "../../api/order";
import { initiateChatRoom } from "../../api/chat";
import { useNavigate } from "react-router-dom";
import {
  FiPackage,
  FiMapPin,
  FiUser,
  FiCreditCard,
  FiClock,
  FiBox,
  FiMessageCircle,
  FiCheckCircle,
  FiXCircle,
  FiAlertTriangle,
} from "react-icons/fi";
import toast from "react-hot-toast";

const MyOrder = () => {
  const navigate = useNavigate();

  // === Fetch Orders ===
  const {
    data: orders,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["myOrders"],
    queryFn: myOrders,
  });

  // === Chat Mutation ===
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

  // === Helpers ===
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
    const formattedTime = date.toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
    return `${formattedDate}, ${formattedTime}`;
  };

  const formatAddress = (address) => {
    if (!address) return "Not provided";
    const { street, city, state, pincode } = address;
    return [street, city, state, pincode].filter(Boolean).join(", ");
  };

  const handleChatWithSeller = (productId) => {
    chatMutation.mutate({ productId });
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "accepted":
        return "bg-green-500 text-white";
      case "pending":
        return "bg-yellow-400 text-gray-800";
      case "rejected":
        return "bg-red-500 text-white";
      default:
        return "bg-gray-400 text-white";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "accepted":
        return <FiCheckCircle className="text-green-500" />;
      case "pending":
        return <FiAlertTriangle className="text-yellow-400" />;
      case "rejected":
        return <FiXCircle className="text-red-500" />;
      default:
        return <FiClock className="text-gray-400" />;
    }
  };

  // === Loading / Error ===
  if (isLoading)
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin h-10 w-10 border-4 border-gray-300 border-t-indigo-600 rounded-full"></div>
      </div>
    );

  if (isError || !orders?.length)
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-gray-600 text-center px-4">
        <FiBox className="text-7xl mb-4 text-gray-400" />
        <h2 className="text-xl font-semibold">
          {error?.response?.data?.message || "No Orders Found"}
        </h2>
        <p className="text-sm text-gray-500 mt-2">
          You haven’t placed any orders yet.
        </p>
      </div>
    );

  // === Main Layout ===
  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 via-white to-indigo-50 px-5 py-14 font-sans">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-extrabold text-gray-900 text-center mb-12 tracking-tight">
          🛍️ My Orders
        </h1>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {orders.map((order) => {
            const isRejected = order.status === "rejected";
            const isDisabled = chatMutation.isPending || isRejected;

            return (
              <div
                key={order._id}
                className="group bg-white/90 backdrop-blur-md border border-gray-200 rounded-3xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col"
              >
                {/* === Product Image === */}
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={
                      order.productId?.media?.[0]?.url ||
                      "https://via.placeholder.com/400x300?text=No+Image"
                    }
                    alt={order.productId?.title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-all duration-700"
                  />
                  <div
                    className={`absolute top-4 right-4 px-3 py-1.5 rounded-full text-xs font-semibold capitalize shadow-md ${getStatusStyle(
                      order.status
                    )}`}
                  >
                    {order.status}
                  </div>
                </div>

                {/* === Content === */}
                <div className="p-6 flex flex-col flex-1 justify-between">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2 mb-2">
                      <FiPackage className="text-indigo-500" />
                      {order.productId?.title || "Untitled Product"}
                    </h2>

                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {order.productId?.description ||
                        "No description available."}
                    </p>

                    <p className="text-indigo-600 font-bold text-xl">
                      ₹{order.priceAtPurchase?.toLocaleString("en-IN")}
                    </p>
                  </div>

                  <div className="mt-5 space-y-3 text-sm text-gray-700">
                    <div className="flex items-start gap-2">
                      <FiUser className="text-indigo-500 mt-0.5" />
                      <span>
                        <strong>Seller:</strong>{" "}
                        {order.sellerId?.fullName || "Unknown"}
                      </span>
                    </div>
                    <div className="flex items-start gap-2">
                      <FiMapPin className="text-indigo-500 mt-0.5" />
                      <span>
                        <strong>Address:</strong>{" "}
                        {formatAddress(order.deliveryAddress)}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FiCreditCard className="text-indigo-500" />
                      <span>
                        <strong>Payment:</strong>{" "}
                        {order.paymentInfo?.provider?.toUpperCase()}
                      </span>
                    </div>
                  </div>

                  <div className="my-5 border-t border-gray-100"></div>

                  <div className="flex justify-between items-center mt-auto">
                    <div className="flex items-center gap-2 text-gray-500 text-xs">
                      <FiClock className="text-indigo-500" />
                      <span>{formatDate(order.createdAt)}</span>
                    </div>

                    {/* === Chat Button === */}
                    <button
                      onClick={() =>
                        !isRejected &&
                        handleChatWithSeller(order.productId?._id)
                      }
                      disabled={isDisabled}
                      className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium shadow-md transition-all duration-200 ${
                        isRejected
                          ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                          : "bg-linear-to-r from-indigo-600 to-blue-600 text-white hover:shadow-xl hover:scale-105 disabled:opacity-70 cursor-pointer"
                      }`}
                    >
                      <FiMessageCircle />
                      {isRejected
                        ? "Order Rejected"
                        : chatMutation.isPending
                        ? "Starting..."
                        : "Chat with Seller"}
                    </button>
                  </div>
                </div>

                {/* === Status Footer === */}
                <div className="bg-gray-50 border-t border-gray-100 px-6 py-3 flex items-center justify-between text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(order.status)}
                    <span className="capitalize">{order.status}</span>
                  </div>
                  <span className="text-xs italic">
                    Order ID: {order._id.slice(-6).toUpperCase()}
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

export default MyOrder;
