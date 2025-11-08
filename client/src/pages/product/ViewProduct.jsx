import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import { fetchProductById } from "../../api/product";
import { initiateChatRoom } from "../../api/chat";
import {
  FiMapPin,
  FiUser,
  FiMessageCircle,
  FiShoppingCart,
} from "react-icons/fi";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import Spinner from "../../components/ui/Spinner";
import toast from "react-hot-toast";

const ViewProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentMedia, setCurrentMedia] = useState(0);

  // === Fetch Product ===
  const {
    data: product,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["product", id],
    queryFn: () => fetchProductById(id),
    staleTime: 1000 * 60 * 2,
  });

  // === Chat Mutation ===
  const chatMutation = useMutation({
    mutationFn: () => initiateChatRoom({ productId: id }),
    onSuccess: (data) => {
      if (!data?.chatRoom?._id) {
        toast.error("Unexpected server response. Try again.");
        return;
      }
      toast.success("Chat started successfully!");
      navigate(`/chat/${data.chatRoom._id}`);
    },
    onError: (error) => {
      console.error("Chat initiation error:", error);
      toast.error(error?.response?.data?.message || "Failed to start chat.");
    },
  });

  if (isLoading) return <Spinner />;
  if (isError || !product)
    return (
      <div className="flex justify-center items-center h-64 text-gray-500">
        Product not found.
      </div>
    );

  // === Handlers ===
  const handleChat = () => chatMutation.mutate();
  const handlePlaceOrder = () => navigate(`/checkout/${id}`);
  const nextMedia = () =>
    setCurrentMedia((prev) =>
      prev === product.media.length - 1 ? 0 : prev + 1
    );
  const prevMedia = () =>
    setCurrentMedia((prev) =>
      prev === 0 ? product.media.length - 1 : prev - 1
    );

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 via-white to-indigo-50 py-12 px-4 sm:px-8 lg:px-14">
      <div className="max-w-6xl mx-auto bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
        {/* === Product Header === */}
        <div className="relative bg-linear-to-r from-indigo-600 to-blue-500 p-8 md:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold mb-2 tracking-tight">
              {product.title}
            </h1>
            <p className="text-indigo-100 text-sm uppercase tracking-widest">
              {product.category}
            </p>
          </div>

          <div className="flex flex-col items-center md:items-end">
            <p className="text-4xl font-extrabold text-yellow-300 drop-shadow-sm">
              ₹{product.price?.toLocaleString()}
            </p>
            <span
              className={`mt-2 px-3 py-1 text-xs font-semibold rounded-full ${
                product.available
                  ? "bg-green-200 text-green-800"
                  : "bg-red-200 text-red-800"
              }`}
            >
              {product.available ? "Available" : "Sold Out"}
            </span>
          </div>
        </div>

        {/* === Media Section === */}
        <div className="relative bg-gray-50 flex flex-col items-center justify-center overflow-hidden">
          {product.media && product.media.length > 0 ? (
            <>
              {product.media[currentMedia].type === "image" ? (
                <img
                  src={product.media[currentMedia].url}
                  alt={product.title}
                  className="w-full max-h-[500px] object-contain bg-white transition-transform duration-700 hover:scale-[1.02]"
                />
              ) : (
                <video
                  src={product.media[currentMedia].url}
                  controls
                  className="w-full max-h-[500px] bg-black object-contain"
                />
              )}

              {/* Carousel Controls */}
              {product.media.length > 1 && (
                <>
                  <button
                    onClick={prevMedia}
                    className="absolute left-5 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-md p-3 rounded-full shadow-lg hover:bg-white hover:scale-110 transition"
                  >
                    <IoChevronBack size={22} />
                  </button>
                  <button
                    onClick={nextMedia}
                    className="absolute right-5 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-md p-3 rounded-full shadow-lg hover:bg-white hover:scale-110 transition"
                  >
                    <IoChevronForward size={22} />
                  </button>
                </>
              )}

              {/* Thumbnails */}
              {product.media.length > 1 && (
                <div className="flex justify-center mt-5 gap-3 flex-wrap">
                  {product.media.map((m, index) => (
                    <img
                      key={index}
                      src={m.url}
                      alt={`thumb-${index}`}
                      onClick={() => setCurrentMedia(index)}
                      className={`w-16 h-16 object-cover rounded-lg border-2 cursor-pointer transition-all ${
                        index === currentMedia
                          ? "border-indigo-600 scale-105"
                          : "border-transparent opacity-70 hover:opacity-100"
                      }`}
                    />
                  ))}
                </div>
              )}
            </>
          ) : (
            <div className="w-full h-[400px] flex items-center justify-center text-gray-400 text-lg">
              No Media Available
            </div>
          )}
        </div>

        {/* === Product Details === */}
        <div className="p-10 grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Left Section - Product Info */}
          <div className="md:col-span-2 space-y-6">
            <div className="flex items-center text-gray-600 gap-2">
              <FiMapPin className="text-indigo-600" />
              <span>{product.location || "Location not available"}</span>
            </div>

            <p className="text-gray-700 leading-relaxed text-lg">
              {product.description || "No description provided."}
            </p>

            <div className="flex flex-wrap gap-3 text-sm mt-6">
              <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full">
                Posted on{" "}
                {new Date(product.createdAt).toLocaleDateString("en-IN")}
              </span>
              <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full">
                Category: {product.category}
              </span>
            </div>
          </div>

          {/* Right Section - Seller Info */}
          <div className="bg-white/90 border border-gray-200 rounded-2xl p-6 shadow-inner backdrop-blur-sm">
            <h3 className="text-xl font-semibold mb-4 text-gray-800 flex items-center gap-2">
              <FiUser className="text-indigo-600" /> Seller Details
            </h3>

            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 bg-linear-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center shadow-inner">
                <FiUser className="text-indigo-600 text-2xl" />
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
              className="w-full flex items-center justify-center gap-2 bg-linear-to-r from-indigo-600 to-blue-600 text-white py-3 rounded-xl font-semibold hover:from-indigo-700 hover:to-blue-700 transition-all shadow-md hover:shadow-xl hover:scale-[1.02] disabled:opacity-70 cursor-pointer"
            >
              <FiMessageCircle size={18} />
              {chatMutation.isPending ? "Starting Chat..." : "Chat with Seller"}
            </button>
          </div>
        </div>

        {/* === Buy Section === */}
        <div className="border-t border-gray-200 p-8 bg-white/80 flex flex-col sm:flex-row justify-between items-center gap-4 backdrop-blur-md">
          <h2 className="text-lg font-medium text-gray-800 text-center sm:text-left">
            Ready to buy this product?
          </h2>
          <button
            onClick={handlePlaceOrder}
            className="flex items-center justify-center gap-2 bg-linear-to-r from-emerald-600 to-green-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-emerald-700 hover:to-green-700 transition-all shadow-lg hover:shadow-2xl hover:scale-[1.02] cursor-pointer"
          >
            <FiShoppingCart size={18} /> Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewProduct;
