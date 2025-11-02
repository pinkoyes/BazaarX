import { Link } from "react-router-dom";
import {
  FiCheckCircle,
  FiXCircle,
  FiMessageCircle,
  FiLoader,
} from "react-icons/fi";

const OrderCard = ({ order, onAccept, onReject, isLoading }) => {
  const { productId, buyerId, status, priceAtPurchase } = order;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 p-5 flex flex-col justify-between">
      {/* Product Info */}
      <div>
        <img
          src={
            productId?.media?.[0]?.url ||
            "https://via.placeholder.com/400x250?text=No+Image"
          }
          alt={productId?.title}
          className="w-full h-40 object-cover rounded-lg mb-3"
        />
        <h3 className="text-lg font-semibold text-gray-800 truncate">
          {productId?.title || "Deleted Product"}
        </h3>
        <p className="text-gray-500 text-sm mb-1">
          Buyer: {buyerId?.fullName || "Unknown"}
        </p>
        <p className="text-gray-400 text-xs">{buyerId?.email}</p>
        <p className="mt-2 text-indigo-600 font-bold text-lg">
          ₹{priceAtPurchase}
        </p>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between mt-4 border-t pt-3">
        {status === "pending" ? (
          <div className="flex items-center gap-3">
            <button
              onClick={onAccept}
              disabled={isLoading}
              className="flex items-center gap-1 text-green-600 hover:text-green-700 transition disabled:opacity-50"
            >
              {isLoading ? (
                <FiLoader className="animate-spin" />
              ) : (
                <FiCheckCircle />
              )}{" "}
              Accept
            </button>
            <button
              onClick={onReject}
              disabled={isLoading}
              className="flex items-center gap-1 text-red-600 hover:text-red-700 transition disabled:opacity-50"
            >
              {isLoading ? (
                <FiLoader className="animate-spin" />
              ) : (
                <FiXCircle />
              )}{" "}
              Reject
            </button>
          </div>
        ) : status === "accept" ? (
          <Link
            to={`/chat/${buyerId?._id}`}
            className="flex items-center gap-1 text-indigo-600 hover:text-indigo-700 transition"
          >
            <FiMessageCircle /> Chat
          </Link>
        ) : (
          <span className="text-gray-500 italic text-sm">Rejected</span>
        )}

        <span
          className={`px-3 py-1 text-xs rounded-full font-medium ${
            status === "pending"
              ? "bg-yellow-100 text-yellow-700"
              : status === "accept"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {status}
        </span>
      </div>
    </div>
  );
};

export default OrderCard;
