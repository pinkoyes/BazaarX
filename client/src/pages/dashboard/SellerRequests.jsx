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

  const {
    data: orders,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["sellerRequests"],
    queryFn: fetchSellerOrders,
  });

  const mutation = useMutation({
    mutationFn: ({ orderId, status }) => updateOrderStatus(orderId, status),
    onSuccess: () => {
      toast.success("Order status updated successfully!");
      queryClient.invalidateQueries(["sellerRequests"]);
    },
    onError: () => toast.error("Failed to update order status!"),
  });

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
    <div className="min-h-screen bg-linear-to-br from-indigo-50 via-white to-violet-100 py-14 px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-900 mb-14">
          🛍️ Customer Requests
        </h1>

        <div className="grid gap-10 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {orders.map((order) => (
            <div
              key={order._id}
              className="group relative bg-white/60 backdrop-blur-xl border border-gray-200 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 flex flex-col"
            >
              {/* Floating Badge */}
              <span
                className={`absolute top-4 right-4 px-3 py-1 z-50 rounded-full text-xs font-medium capitalize shadow-sm ${
                  order.status === "accepted"
                    ? "bg-emerald-500/90 text-white"
                    : order.status === "rejected"
                    ? "bg-rose-500/90 text-white"
                    : "bg-amber-400/90 text-white"
                }`}
              >
                {order.status}
              </span>

              {/* Product Image */}
              <div className="overflow-hidden rounded-2xl mb-5">
                <img
                  src={
                    order.productId?.media?.[0]?.url ||
                    "https://via.placeholder.com/400x250?text=No+Image"
                  }
                  alt="Product"
                  className="w-full h-52 object-cover transform group-hover:scale-105 transition-all duration-300"
                />
              </div>

              {/* Product Details */}
              <div className="flex flex-col justify-between flex-1">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 flex items-center gap-2 mb-2">
                    <FiPackage className="text-indigo-500" />
                    {order.productId?.title || "Untitled Product"}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                    {order.productId?.description ||
                      "No description available."}
                  </p>
                  <p className="text-2xl font-bold text-indigo-600">
                    ₹{order.priceAtPurchase.toLocaleString("en-IN")}
                  </p>
                </div>

                {/* Buyer Info Card */}
                <div className="bg-slate-50/80 mt-6 rounded-2xl p-4 shadow-inner space-y-2">
                  <div className="flex items-center gap-2 text-gray-700">
                    <FiUser className="text-gray-500" />
                    <span className="font-medium">
                      {order.buyerId?.fullName || "Unknown Buyer"}
                    </span>
                  </div>

                  {order.buyerId?.email && (
                    <div className="flex items-center gap-2 text-gray-700">
                      <FiMail className="text-gray-500" />
                      <span>{order.buyerId.email}</span>
                    </div>
                  )}

                  {order.buyerId?.phoneNumber && (
                    <div className="flex items-center gap-2 text-gray-700">
                      <FiPhone className="text-gray-500" />
                      <span>{order.buyerId.phoneNumber}</span>
                    </div>
                  )}

                  <div className="flex items-center gap-2 text-gray-700">
                    <FiCreditCard className="text-gray-500" />
                    <span className="capitalize">
                      {order.paymentInfo?.provider || "N/A"} (
                      {order.paymentStatus})
                    </span>
                  </div>

                  <div className="flex items-start gap-2 text-gray-700">
                    <FiMapPin className="text-gray-500 mt-0.5" />
                    <span className="text-gray-600 text-sm">
                      {order.deliveryAddress
                        ? `${order.deliveryAddress.street}, ${order.deliveryAddress.city}, ${order.deliveryAddress.state} - ${order.deliveryAddress.pincode}`
                        : "Address not provided"}
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-6 flex flex-col gap-3">
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
                        className="flex-1 bg-linear-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white py-2.5 rounded-xl font-semibold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
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
                        className="flex-1 bg-linear-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white py-2.5 rounded-xl font-semibold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
                      >
                        <FiX /> Reject
                      </button>
                    </div>
                  ) : (
                    <div className="text-sm text-gray-500 font-medium italic text-center">
                      Status: {order.status}
                    </div>
                  )}

                  <button
                    onClick={() =>
                      chatMutation.mutate({
                        productId: order.productId?._id,
                        buyerId: order.buyerId?._id,
                      })
                    }
                    disabled={chatMutation.isPending}
                    className="flex items-center justify-center gap-2 bg-white border border-indigo-500 text-indigo-600 hover:bg-indigo-50 font-semibold px-4 py-2.5 rounded-xl shadow-sm transition-all"
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
