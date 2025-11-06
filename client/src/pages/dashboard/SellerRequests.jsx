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
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const SellerRequests = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  // === Fetch seller orders ===
  const {
    data: orders,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["sellerRequests"],
    queryFn: fetchSellerOrders,
  });

  // === Update order status ===
  const mutation = useMutation({
    mutationFn: ({ orderId, status }) => updateOrderStatus(orderId, status),
    onSuccess: () => {
      toast.success("Order status updated successfully!");
      queryClient.invalidateQueries(["sellerRequests"]);
    },
    onError: () => toast.error("Failed to update order status!"),
  });

  // === Chat mutation ===
  const chatMutation = useMutation({
    mutationFn: ({ productId, buyerId }) =>
      initiateChatRoom({ productId, buyerId }),
    onSuccess: (data) => {
      toast.success("Chat started successfully!");
      navigate(`/chat/${data.chatRoom._id}`);
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.message || "Failed to start chat with buyer."
      );
    },
  });

  if (isLoading)
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-500 text-lg">
        Loading requests...
      </div>
    );

  if (isError)
    return (
      <div className="flex justify-center items-center min-h-screen text-red-500 text-lg">
        Error: {error.message}
      </div>
    );

  if (!orders || orders.length === 0)
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-500 text-lg">
        No requests found.
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-semibold text-gray-900 mb-10 text-center">
          Customer Requests
        </h1>

        <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-200 flex flex-col overflow-hidden"
            >
              {/* === Product Image === */}
              <div className="relative">
                <img
                  src={
                    order.productId?.media?.[0]?.url ||
                    "https://via.placeholder.com/400x250?text=No+Image"
                  }
                  alt="Product"
                  className="w-full h-52 object-cover"
                />
                <span
                  className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-medium backdrop-blur-md capitalize ${
                    order.status === "accepted"
                      ? "bg-green-100 text-green-700"
                      : order.status === "rejected"
                      ? "bg-red-100 text-red-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {order.status}
                </span>
              </div>

              {/* === Card Content === */}
              <div className="p-6 flex flex-col grow justify-between">
                {/* Product Info */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2 mb-1">
                    <FiPackage className="text-indigo-500" />
                    {order.productId?.title || "Untitled Product"}
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-2 mb-2">
                    {order.productId?.description ||
                      "No description available."}
                  </p>
                  <p className="text-lg font-semibold text-indigo-600">
                    ₹{order.priceAtPurchase.toLocaleString("en-IN")}
                  </p>
                </div>

                <div className="my-4 border-t border-gray-100" />

                {/* Buyer Info */}
                <div className="text-sm text-gray-700 space-y-1">
                  <div className="flex items-center gap-2">
                    <FiUser className="text-gray-500" />
                    <span className="font-medium">
                      {order.buyerId?.fullName || "Unknown Buyer"}
                    </span>
                  </div>

                  {order.buyerId?.email && (
                    <div className="flex items-center gap-2">
                      <FiMail className="text-gray-500" />
                      <span>{order.buyerId.email}</span>
                    </div>
                  )}

                  {order.buyerId?.phoneNumber && (
                    <div className="flex items-center gap-2">
                      <FiPhone className="text-gray-500" />
                      <span>{order.buyerId.phoneNumber}</span>
                    </div>
                  )}

                  <div className="flex items-center gap-2">
                    <FiCreditCard className="text-gray-500" />
                    <span className="capitalize">
                      {order.paymentInfo?.provider || "N/A"} (
                      {order.paymentStatus})
                    </span>
                  </div>

                  <div className="flex items-start gap-2 leading-5">
                    <FiMapPin className="text-gray-500 mt-0.5" />
                    <span className="text-gray-600">
                      {order.deliveryAddress
                        ? `${order.deliveryAddress.street}, ${order.deliveryAddress.city}, ${order.deliveryAddress.state} - ${order.deliveryAddress.pincode}`
                        : "Address not provided"}
                    </span>
                  </div>
                </div>

                <div className="my-4 border-t border-gray-100" />

                {/* === Actions === */}
                <div className="flex flex-col gap-2">
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
                        className="flex-1 flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-xl font-medium transition disabled:opacity-60"
                      >
                        <FiCheck />
                        Accept
                      </button>

                      <button
                        disabled={mutation.isPending}
                        onClick={() =>
                          mutation.mutate({
                            orderId: order._id,
                            status: "rejected",
                          })
                        }
                        className="flex-1 flex items-center justify-center gap-2 bg-rose-500 hover:bg-rose-600 text-white px-4 py-2 rounded-xl font-medium transition disabled:opacity-60"
                      >
                        <FiX />
                        Reject
                      </button>
                    </div>
                  ) : (
                    <div className="text-sm text-gray-500 font-medium italic text-center">
                      Status: {order.status}
                    </div>
                  )}

                  {/* ✅ Chat with Buyer */}
                  <button
                    onClick={() =>
                      chatMutation.mutate({
                        productId: order.productId?._id,
                        buyerId: order.buyerId?._id, // ✅ added for seller-initiated chat
                      })
                    }
                    disabled={chatMutation.isPending}
                    className="flex items-center justify-center gap-2 border border-indigo-500 text-indigo-600 hover:bg-indigo-50 font-medium px-4 py-2 rounded-xl transition disabled:opacity-70"
                  >
                    <FiMessageSquare />
                    {chatMutation.isPending
                      ? "Starting Chat..."
                      : "Chat with Buyer"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SellerRequests;
