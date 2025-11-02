import { useQuery } from "@tanstack/react-query";
import { myOrders } from "../../api/order";
import {
  FiPackage,
  FiMapPin,
  FiUser,
  FiCreditCard,
  FiClock,
  FiBox,
} from "react-icons/fi";

const MyOrder = () => {
  const {
    data: orders,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["myOrders"],
    queryFn: myOrders,
  });

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
    if (typeof address === "string") return address;
    if (typeof address === "object") {
      const { street, city, state, pincode } = address;
      return [street, city, state, pincode].filter(Boolean).join(", ");
    }
    return "Invalid address format";
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin h-10 w-10 border-4 border-gray-300 border-t-gray-700 rounded-full"></div>
      </div>
    );
  }

  if (isError || !orders?.length) {
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
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
        My Orders
      </h1>

      <div className="grid gap-6">
        {orders.map((order) => (
          <div
            key={order._id}
            className="flex flex-col md:flex-row border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden bg-white"
          >
            {/* Product Image */}
            <div className="md:w-1/4 w-full relative">
              <img
                src={
                  order.productId?.media?.[0]?.url ||
                  "https://via.placeholder.com/400x300?text=No+Image"
                }
                alt={order.productId?.title}
                className="w-full h-52 md:h-full object-cover"
              />
              <div
                className={`absolute top-3 right-3 px-3 py-1.5 rounded-full text-xs font-medium capitalize shadow-sm ${
                  order.status === "delivered"
                    ? "bg-green-100 text-green-700"
                    : order.status === "pending"
                    ? "bg-yellow-100 text-yellow-700"
                    : order.status === "cancelled"
                    ? "bg-red-100 text-red-700"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                {order.status}
              </div>
            </div>

            {/* Details */}
            <div className="flex-1 p-5 flex flex-col justify-between">
              {/* Header */}
              <div>
                <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-1">
                  {order.productId?.title}
                </h2>
                <p className="text-gray-600 text-sm line-clamp-2 mb-3">
                  {order.productId?.description || "No description available."}
                </p>
                <p className="text-indigo-600 font-bold text-lg">
                  ₹{order.priceAtPurchase?.toLocaleString("en-IN")}
                </p>
              </div>

              {/* Info */}
              <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-sm">
                <div className="flex items-start gap-2 text-gray-800">
                  <FiUser className="text-gray-500 mt-0.5" />
                  <span>
                    <strong className="text-gray-900">Seller:</strong>{" "}
                    {order.sellerId?.fullName || "Unknown"}
                  </span>
                </div>

                <div className="flex items-start gap-2 text-gray-800">
                  <FiMapPin className="text-gray-500 mt-0.5" />
                  <span>
                    <strong className="text-gray-900">Address:</strong>{" "}
                    {formatAddress(order.deliveryAddress)}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-gray-800">
                  <FiCreditCard className="text-gray-500" />
                  <span>
                    <strong className="text-gray-900">Payment:</strong>{" "}
                    {order.paymentInfo?.provider || "Not specified"}
                  </span>
                </div>
              </div>

              {/* Footer */}
              <div className="mt-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div
                  className={`px-4 py-1.5 text-sm rounded-full font-semibold tracking-wide capitalize ${
                    order.status === "delivered"
                      ? "bg-green-100 text-green-700"
                      : order.status === "pending"
                      ? "bg-yellow-100 text-yellow-700"
                      : order.status === "cancelled"
                      ? "bg-red-100 text-red-700"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {order.status}
                </div>

                <div className="flex items-center gap-2 text-gray-500 text-sm">
                  <FiClock className="text-gray-400" />
                  <span>{formatDate(order.createdAt)}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyOrder;
