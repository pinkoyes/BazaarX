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
      className="group relative flex flex-col bg-white/90 backdrop-blur-md rounded-2xl overflow-hidden border border-gray-100 hover:border-indigo-500/40 shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-1"
    >
      {/* === Product Image === */}
      <div className="relative w-full h-56 overflow-hidden rounded-t-2xl bg-gray-50">
        <img
          src={image}
          alt={product.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />

        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-linear-to-t from-black/50 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>

        {/* Wishlist Icon */}
        <button
          onClick={(e) => e.preventDefault()}
          className="absolute top-3 right-3 bg-white/80 backdrop-blur-md p-2.5 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white hover:scale-110 shadow-md"
        >
          <FiHeart className="text-gray-700 hover:text-red-500" size={18} />
        </button>

        {/* Sold Badge */}
        {!product.available && (
          <span className="absolute top-3 left-3 bg-red-600 text-white text-[11px] font-medium px-3 py-1 rounded-full shadow-md uppercase tracking-wide">
            Sold
          </span>
        )}

        {/* Floating Price Tag */}
        <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-md text-indigo-600 font-semibold px-4 py-1.5 rounded-full text-sm shadow-md">
          ₹{product.price?.toLocaleString("en-IN") || "N/A"}
        </div>
      </div>

      {/* === Product Info === */}
      <div className="flex flex-col grow p-5">
        {/* Title */}
        <h3 className="text-[15px] sm:text-base font-semibold text-gray-900 leading-tight line-clamp-1 mb-1 group-hover:text-indigo-600 transition-colors">
          {product.title}
        </h3>

        {/* Description */}
        <p className="text-gray-500 text-sm line-clamp-2 mb-3">
          {product.description || "No description provided."}
        </p>

        {/* Location */}
        <div className="flex items-center text-gray-500 text-sm mb-4">
          <FiMapPin className="text-gray-400 mr-1" size={14} />
          <span className="truncate">{product.location || "Unknown"}</span>
        </div>

        {/* Bottom Row */}
        <div className="mt-auto flex items-center justify-between pt-3 border-t border-gray-100">
          <span className="text-xs bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full capitalize font-medium shadow-sm">
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

      {/* Hover Glow Effect */}
      <div className="absolute inset-0 rounded-2xl bg-linear-to-r from-indigo-500/10 via-transparent to-blue-500/10 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500 pointer-events-none"></div>
    </Link>
  );
};

export default ProductCard;
