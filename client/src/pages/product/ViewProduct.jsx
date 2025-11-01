import React, { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import { fetchProductById, initiateChatWithOwner } from "../../api/product";
import {
  FiMapPin,
  FiUser,
  FiMessageCircle,
  FiHeart,
  FiShoppingCart,
} from "react-icons/fi";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import Spinner from "../../components/ui/Spinner";
import toast from "react-hot-toast";

const ViewProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [liked, setLiked] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);

  // ===== Fetch Product =====
  const {
    data: product,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["product", id],
    queryFn: () => fetchProductById(id),
    enabled: !!id,
  });

  // ===== Chat Mutation =====
  const chatMutation = useMutation({
    mutationFn: (ownerId) => initiateChatWithOwner({ ownerId, productId: id }),
    onSuccess: (data) => {
      toast.success("Chat started successfully!");
      navigate(`/chat/${data.chatId}`);
    },
    onError: () => {
      toast.error("Failed to start chat. Try again.");
    },
  });

  if (isLoading) return <Spinner />;
  if (isError || !product)
    return (
      <div className="flex justify-center items-center h-64 text-gray-500">
        Product not found.
      </div>
    );

  const handleChat = () => chatMutation.mutate(product.ownerId?._id);

  const handleLike = () => {
    setLiked((prev) => !prev);
    toast.success(liked ? "Removed from favorites" : "Added to favorites");
  };

  const nextImage = () =>
    setCurrentImage((prev) =>
      prev === product.media.length - 1 ? 0 : prev + 1
    );

  const prevImage = () =>
    setCurrentImage((prev) =>
      prev === 0 ? product.media.length - 1 : prev - 1
    );

  const handlePlaceOrder = () => {
    toast.success("Order placed successfully!");
  };

  const handlePayment = () => {
    toast.loading("Redirecting to payment gateway...");
    setTimeout(() => {
      toast.success("Payment successful!");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-3 sm:px-6 lg:px-12">
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-2xl overflow-hidden">
        {/* ===== Image Carousel ===== */}
        <div className="relative group bg-gray-100">
          {product.media && product.media.length > 0 ? (
            <>
              <div className="w-full aspect-4/3 sm:aspect-video overflow-hidden">
                <img
                  src={product.media[currentImage].url}
                  alt={product.title}
                  className="w-full h-full object-contain sm:object-cover transition-transform duration-500 ease-in-out"
                />
              </div>

              {product.media.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute top-1/2 left-3 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow hover:bg-white transition"
                  >
                    <IoChevronBack size={22} />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute top-1/2 right-3 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow hover:bg-white transition"
                  >
                    <IoChevronForward size={22} />
                  </button>
                </>
              )}

              {/* Dots */}
              <div className="absolute bottom-4 w-full flex justify-center gap-2">
                {product.media.map((_, i) => (
                  <div
                    key={i}
                    onClick={() => setCurrentImage(i)}
                    className={`w-3 h-3 rounded-full cursor-pointer ${
                      i === currentImage ? "bg-blue-600" : "bg-gray-300"
                    }`}
                  ></div>
                ))}
              </div>
            </>
          ) : (
            <div className="w-full aspect-4/3 flex items-center justify-center bg-gray-200">
              <span className="text-gray-500 text-sm">No Image Available</span>
            </div>
          )}

          {/* Sold Label */}
          {!product.available && (
            <span className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1 text-xs rounded-full shadow-md uppercase">
              Sold
            </span>
          )}

          {/* Like Button */}
          <button
            onClick={handleLike}
            className={`absolute top-4 left-4 p-2 rounded-full shadow-md transition ${
              liked ? "bg-red-500 text-white" : "bg-white text-gray-700"
            }`}
          >
            <FiHeart size={20} />
          </button>
        </div>

        {/* ===== Product Details ===== */}
        <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* ===== Product Info ===== */}
          <div className="md:col-span-2">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
              {product.title}
            </h1>
            <p className="text-blue-600 text-xl sm:text-2xl font-semibold mb-4">
              ₹{product.price?.toLocaleString()}
            </p>

            <div className="flex items-center text-gray-600 mb-4 text-sm sm:text-base">
              <FiMapPin className="mr-2 text-gray-400" />
              <span>{product.location}</span>
            </div>

            <p className="text-gray-700 leading-relaxed mb-6 whitespace-pre-line text-sm sm:text-base">
              {product.description || "No description provided."}
            </p>

            <div className="flex flex-wrap gap-3 text-xs sm:text-sm">
              <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full">
                Category: {product.category || "N/A"}
              </span>
              {product.createdAt && (
                <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full">
                  Posted on{" "}
                  {new Date(product.createdAt).toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </span>
              )}
            </div>
          </div>

          {/* ===== Seller Info ===== */}
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 sm:p-6 shadow-sm">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">
              Seller Information
            </h3>

            <div className="flex items-center gap-4 mb-5">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <FiUser className="text-blue-600 text-xl" />
              </div>
              <div>
                <p className="font-semibold text-gray-800">
                  {product.ownerId?.fullName || "Unknown Seller"}
                </p>
                <p className="text-sm text-gray-500">
                  {product.ownerId?.email || ""}
                </p>
              </div>
            </div>

            <button
              onClick={handleChat}
              disabled={chatMutation.isPending}
              className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-all duration-200 shadow-md disabled:opacity-70 cursor-pointer"
            >
              <FiMessageCircle size={18} />
              {chatMutation.isPending ? "Starting Chat..." : "Chat with Seller"}
            </button>

            <Link
              to="/home"
              className="block text-center text-blue-600 mt-4 hover:underline"
            >
              Back to Home
            </Link>
          </div>
        </div>

        {/* ===== Purchase Section (Separate) ===== */}
        <div className="border-t border-gray-200 p-6 sm:p-8 bg-gray-50 flex flex-col sm:flex-row items-center justify-between gap-4">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-800 text-center sm:text-left">
            Ready to buy this product?
          </h2>
          <div className="flex flex-wrap justify-center sm:justify-end gap-3">
            <button
              onClick={handlePlaceOrder}
              className="flex items-center justify-center gap-2 bg-green-600 text-white px-5 sm:px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition-all duration-200 shadow-md cursor-pointer"
            >
              <FiShoppingCart size={18} />
              Place Order
            </button>
            <button
              onClick={handlePayment}
              className="flex items-center justify-center gap-2 bg-indigo-600 text-white px-5 sm:px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition-all duration-200 shadow-md cursor-pointer"
            >
              💳 Make Payment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewProduct;
