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
    <div className="max-w-7xl mx-auto px-6 py-10">
      {/* Back button */}
      <div className="flex justify-between items-center mb-10">
        <Link
          to="/seller-dashboard"
          className="flex items-center gap-2 text-indigo-600 hover:text-indigo-800 font-medium transition-all"
        >
          <FiArrowLeft /> Back to Dashboard
        </Link>
      </div>

      {/* Main Card */}
      <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 p-10">
          {/* === LEFT: IMAGE SECTION === */}
          <div className="flex flex-col items-center">
            <div className="relative w-full aspect-square overflow-hidden rounded-2xl border border-gray-200 bg-gray-50 shadow-sm">
              <img
                src={
                  activeImage ||
                  "https://via.placeholder.com/600x600?text=No+Image+Available"
                }
                alt={product.title}
                className="object-cover w-full h-full hover:scale-105 transition-transform duration-500"
              />
            </div>

            {/* Thumbnails */}
            <div className="flex gap-3 mt-4 overflow-x-auto pb-2">
              {product.media?.map((media, index) => (
                <img
                  key={index}
                  src={media.url}
                  alt={`thumb-${index}`}
                  onClick={() => setActiveImage(media.url)}
                  className={`w-20 h-20 object-cover rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                    activeImage === media.url
                      ? "border-indigo-500 scale-105"
                      : "border-gray-200 hover:border-indigo-300 hover:scale-105"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* === RIGHT: PRODUCT INFO === */}
          <div className="flex flex-col justify-between">
            {/* Product Info */}
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                {product.title}
              </h1>
              <p className="text-gray-600 leading-relaxed mb-5 text-base">
                {product.description}
              </p>

              {/* Price */}
              <div className="flex items-center text-3xl font-bold text-indigo-600 mb-6">
                ₹{product.price?.toLocaleString("en-IN")}
              </div>

              {/* Product Details */}
              <div className="space-y-3 text-gray-700 text-sm">
                <div className="flex items-center">
                  <FiMapPin className="mr-2 text-gray-500" />
                  <span className="font-medium">{product.location}</span>
                </div>

                <div>
                  <span className="font-semibold">Category:</span>{" "}
                  <span className="capitalize text-gray-800">
                    {product.category}
                  </span>
                </div>

                <div>
                  <span className="font-semibold">Availability:</span>{" "}
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
                  <FiCalendar className="mr-2 text-gray-500" />
                  <span>
                    Listed on:{" "}
                    {new Date(product.createdAt).toLocaleDateString("en-IN")}
                  </span>
                </div>
              </div>
            </div>

            {/* === SELLER INFO CARD === */}
            <div className="mt-10 border-t border-gray-100 pt-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Seller Information
              </h2>
              <div className="flex items-center gap-4 bg-linear-to-r from-gray-50 to-gray-100 p-5 rounded-2xl shadow-sm border border-gray-100">
                <div className="flex flex-col">
                  <div className="flex items-center gap-2 text-gray-800 font-medium">
                    <FiUser className="text-gray-600" />
                    {product.ownerId?.fullName}
                  </div>
                  <div className="flex items-center gap-2 text-gray-600 text-sm mt-1">
                    <FiMail className="text-gray-500" />
                    {product.ownerId?.email}
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
