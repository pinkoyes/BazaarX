import { Link } from "react-router-dom";
import {
  FiCheckCircle,
  FiXCircle,
  FiMessageCircle,
  FiLoader,
  FiPackage,
} from "react-icons/fi";

const OrderCard = ({ order, onAccept, onReject, isLoading }) => {
  const { productId, buyerId, status, priceAtPurchase } = order;

  const statusStyles = {
    pending: "bg-yellow-100 text-yellow-700 border-yellow-200",
    accept: "bg-green-100 text-green-700 border-green-200",
    reject: "bg-red-100 text-red-700 border-red-200",
  };

  return (
    <div className="relative bg-white/90 backdrop-blur-md rounded-2xl shadow-sm border border-gray-100 hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 p-5 flex flex-col justify-between overflow-hidden group">
      {/* Subtle Gradient Glow */}
      <div className="absolute inset-0 bg-linear-to-br from-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition duration-500 pointer-events-none"></div>

      {/* Product Section */}
      <div>
        <div className="relative rounded-xl overflow-hidden mb-4">
          <img
            src={
              productId?.media?.[0]?.url ||
              "https://via.placeholder.com/400x250?text=No+Image"
            }
            alt={productId?.title}
            className="w-full h-40 object-cover transition-transform duration-700 group-hover:scale-105"
          />
          {/* Status Ribbon */}
          <span
            className={`absolute top-3 left-3 px-3 py-1.5 text-[11px] rounded-full font-medium border ${statusStyles[status]}`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </span>
        </div>

        {/* Product Info */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-800 truncate">
              {productId?.title || "Deleted Product"}
            </h3>
            <p className="text-gray-500 text-sm mt-1">
              Buyer:{" "}
              <span className="font-medium text-gray-700">
                {buyerId?.fullName || "Unknown"}
              </span>
            </p>
            <p className="text-gray-400 text-xs">{buyerId?.email}</p>
          </div>
          <div className="bg-indigo-50 text-indigo-700 font-semibold px-3 py-1 rounded-full shadow-sm text-sm self-start">
            ₹{priceAtPurchase}
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between mt-5 border-t border-gray-100 pt-3">
        {status === "pending" ? (
          <div className="flex items-center gap-3">
            {/* Accept Button */}
            <button
              onClick={onAccept}
              disabled={isLoading}
              className="flex items-center gap-1.5 bg-green-100 text-green-700 hover:bg-green-200 transition-all px-3 py-1.5 rounded-lg font-medium text-sm disabled:opacity-60 shadow-sm hover:shadow-md"
            >
              {isLoading ? (
                <FiLoader className="animate-spin" />
              ) : (
                <FiCheckCircle size={16} />
              )}
              Accept
            </button>

            {/* Reject Button */}
            <button
              onClick={onReject}
              disabled={isLoading}
              className="flex items-center gap-1.5 bg-red-100 text-red-700 hover:bg-red-200 transition-all px-3 py-1.5 rounded-lg font-medium text-sm disabled:opacity-60 shadow-sm hover:shadow-md"
            >
              {isLoading ? (
                <FiLoader className="animate-spin" />
              ) : (
                <FiXCircle size={16} />
              )}
              Reject
            </button>
          </div>
        ) : status === "accept" ? (
          <Link
            to={`/chat/${buyerId?._id}`}
            className="flex items-center gap-2 bg-indigo-100 text-indigo-700 hover:bg-indigo-200 transition-all px-3 py-1.5 rounded-lg font-medium text-sm shadow-sm hover:shadow-md"
          >
            <FiMessageCircle size={16} />
            Chat with Buyer
          </Link>
        ) : (
          <span className="text-gray-400 italic text-sm">Rejected</span>
        )}

        {/* Status Tag (bottom-right) */}
        <div className="hidden sm:flex items-center gap-1 text-gray-400 text-xs font-medium">
          <FiPackage className="text-gray-400" size={14} />
          {status === "pending"
            ? "Awaiting Response"
            : status === "accept"
            ? "In Progress"
            : "Closed"}
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
