import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  FiMapPin,
  FiUser,
  FiMail,
  FiCalendar,
  FiArrowLeft,
} from "react-icons/fi";
import toast from "react-hot-toast";
import { fetchProductById } from "../../api/product";

const ViewSellerProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await fetchProductById(id);
        setProduct(data);
        setActiveImage(data.media?.[0]?.url);
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to fetch product");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen text-gray-600 text-lg font-medium">
        Loading product details...
      </div>
    );

  if (!product)
    return (
      <div className="flex justify-center items-center h-screen text-red-500 text-lg font-medium">
        Product not found
      </div>
    );

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 via-white to-indigo-50 py-12 px-4 sm:px-8 lg:px-16 font-sans">
      {/* === Header === */}
      <div className="max-w-6xl mx-auto mb-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <Link
          to="/seller-dashboard"
          className="flex items-center gap-2 text-indigo-600 hover:text-indigo-800 font-semibold transition-all"
        >
          <FiArrowLeft /> Back to Dashboard
        </Link>

        <h1 className="text-3xl font-bold text-gray-900">
          🛍️ Product Overview
        </h1>
      </div>

      {/* === Product Card === */}
      <div className="max-w-6xl mx-auto bg-white/90 backdrop-blur-md rounded-3xl shadow-xl border border-gray-100 overflow-hidden transition-all hover:shadow-2xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 p-8 sm:p-10">
          {/* === LEFT: IMAGE SECTION === */}
          <div className="flex flex-col items-center">
            <div className="relative w-full aspect-square overflow-hidden rounded-2xl border border-gray-200 bg-gray-50 shadow-inner">
              <img
                src={
                  activeImage ||
                  "https://via.placeholder.com/600x600?text=No+Image+Available"
                }
                alt={product.title}
                className="object-cover w-full h-full transition-transform duration-700 hover:scale-105"
              />
            </div>

            {/* Thumbnails */}
            <div className="flex gap-3 mt-5 overflow-x-auto pb-2">
              {product.media?.map((media, index) => (
                <img
                  key={index}
                  src={media.url}
                  alt={`thumb-${index}`}
                  onClick={() => setActiveImage(media.url)}
                  className={`w-20 h-20 object-cover rounded-xl border-2 cursor-pointer transition-all ${
                    activeImage === media.url
                      ? "border-indigo-500 scale-105"
                      : "border-gray-200 hover:border-indigo-300 hover:scale-105"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* === RIGHT: PRODUCT DETAILS === */}
          <div className="flex flex-col justify-between">
            {/* Product Info */}
            <div>
              <h1 className="text-4xl font-extrabold text-gray-900 mb-4 leading-tight">
                {product.title}
              </h1>

              <p className="text-gray-600 leading-relaxed mb-6 text-base">
                {product.description ||
                  "No description provided. Add product details to make it appealing to customers."}
              </p>

              {/* Price */}
              <div className="flex items-center text-4xl font-extrabold text-indigo-600 mb-8 tracking-tight">
                ₹{product.price?.toLocaleString("en-IN")}
              </div>

              {/* Product Details */}
              <div className="space-y-4 text-gray-700 text-sm">
                <div className="flex items-center">
                  <FiMapPin className="mr-2 text-indigo-600" />
                  <span className="font-medium">{product.location}</span>
                </div>

                <div>
                  <span className="font-semibold text-gray-800">Category:</span>{" "}
                  <span className="capitalize">{product.category}</span>
                </div>

                <div>
                  <span className="font-semibold text-gray-800">
                    Availability:
                  </span>{" "}
                  {product.available ? (
                    <span className="text-green-600 font-medium">
                      Available
                    </span>
                  ) : (
                    <span className="text-red-500 font-medium">
                      Out of Stock
                    </span>
                  )}
                </div>

                <div className="flex items-center">
                  <FiCalendar className="mr-2 text-indigo-600" />
                  <span>
                    Listed on:{" "}
                    {new Date(product.createdAt).toLocaleDateString("en-IN")}
                  </span>
                </div>
              </div>
            </div>

            {/* Seller Info */}
            <div className="mt-12 border-t border-gray-100 pt-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-5 flex items-center gap-2">
                <FiUser className="text-indigo-600" /> Seller Information
              </h2>

              <div className="flex items-center gap-4 bg-linear-to-r from-gray-50 to-indigo-50 p-6 rounded-2xl shadow-inner border border-gray-100">
                <div className="w-14 h-14 bg-linear-to-br from-indigo-100 to-blue-100 rounded-full flex items-center justify-center">
                  <FiUser className="text-indigo-600 text-2xl" />
                </div>

                <div>
                  <div className="flex items-center gap-2 text-gray-800 font-semibold">
                    {product.ownerId?.fullName || "Unknown Seller"}
                  </div>
                  <div className="flex items-center gap-2 text-gray-600 text-sm mt-1">
                    <FiMail className="text-gray-500" />
                    {product.ownerId?.email || "No email available"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewSellerProduct;
