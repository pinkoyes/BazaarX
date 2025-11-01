import React from "react";
import { Link } from "react-router-dom";
import { FiMapPin, FiHeart } from "react-icons/fi";

const ProductCard = ({ product }) => {
  const image =
    product.media?.length > 0
      ? product.media[0].url
      : "https://via.placeholder.com/400x300?text=No+Image";

  return (
    <Link
      to={`/product/${product._id}`}
      className="group relative flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-blue-500/30"
    >
      {/* === Product Image === */}
      <div className="relative w-full h-56 overflow-hidden bg-gray-50">
        <img
          src={image}
          alt={product.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-black/40 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

        {/* Wishlist Icon */}
        <button
          onClick={(e) => e.preventDefault()}
          className="absolute top-3 right-3 bg-white/90 backdrop-blur-md p-2.5 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-105 shadow-sm"
        >
          <FiHeart className="text-gray-700 hover:text-red-500" size={18} />
        </button>

        {/* Sold Badge */}
        {!product.available && (
          <span className="absolute top-3 left-3 bg-red-600 text-white text-[11px] font-medium px-3 py-1 rounded-full shadow-sm uppercase tracking-wide">
            Sold
          </span>
        )}
      </div>

      {/* === Product Details === */}
      <div className="flex flex-col grow p-4">
        {/* Title */}
        <h3 className="text-[15px] sm:text-base font-semibold text-gray-900 leading-tight line-clamp-1 mb-1 group-hover:text-blue-600 transition-colors">
          {product.title}
        </h3>

        {/* Price */}
        <p className="text-lg font-bold text-blue-600 mb-2">
          ₹{product.price?.toLocaleString("en-IN") || "N/A"}
        </p>

        {/* Location */}
        <div className="flex items-center text-gray-500 text-sm mb-3">
          <FiMapPin className="text-gray-400 mr-1" size={14} />
          <span className="truncate">{product.location || "Unknown"}</span>
        </div>

        {/* Category + Date Row */}
        <div className="mt-auto flex items-center justify-between pt-3 border-t border-gray-100">
          <span className="text-xs bg-blue-50 text-blue-700 px-3 py-1 rounded-full capitalize font-medium">
            {product.category || "Uncategorized"}
          </span>
          {product.createdAt && (
            <span className="text-[11px] text-gray-400">
              {new Date(product.createdAt).toLocaleDateString("en-IN", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
