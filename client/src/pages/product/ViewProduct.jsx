import React, { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import { fetchProductById, initiateChatWithOwner } from "../../api/product";
import { FiMapPin, FiUser, FiMessageCircle, FiHeart } from "react-icons/fi";
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

  const handleChat = () => {
    chatMutation.mutate(product.ownerId?._id);
  };

  const handleLike = () => {
    setLiked((prev) => !prev);
    toast.success(liked ? "Removed from favorites" : "Added to favorites");
  };

  const nextImage = () => {
    setCurrentImage((prev) =>
      prev === product.media.length - 1 ? 0 : prev + 1
    );
  };
  const prevImage = () => {
    setCurrentImage((prev) =>
      prev === 0 ? product.media.length - 1 : prev - 1
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-8 lg:px-16">
      <div className="max-w-6xl mx-auto bg-white shadow-md rounded-2xl overflow-hidden">
        {/* ===== Image Carousel ===== */}
        <div className="relative group">
          {product.media && product.media.length > 0 ? (
            <>
              <img
                src={product.media[currentImage].url}
                alt={product.title}
                className="w-full h-[450px] object-cover transition-all duration-500"
              />
              {product.media.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute top-1/2 left-4 -translate-y-1/2 bg-white/70 p-2 rounded-full shadow hover:bg-white transition"
                  >
                    <IoChevronBack size={22} />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute top-1/2 right-4 -translate-y-1/2 bg-white/70 p-2 rounded-full shadow hover:bg-white transition"
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
            <img
              src="https://via.placeholder.com/800x600?text=No+Image"
              alt="No Image"
              className="w-full h-[450px] object-cover"
            />
          )}

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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-8">
          {/* ===== Left: Product Info ===== */}
          <div className="md:col-span-2">
            <h1 className="text-3xl font-bold text-gray-900 mb-3">
              {product.title}
            </h1>
            <p className="text-blue-600 text-2xl font-semibold mb-4">
              ₹{product.price?.toLocaleString()}
            </p>

            <div className="flex items-center text-gray-600 mb-4">
              <FiMapPin className="mr-2 text-gray-400" />
              <span>{product.location}</span>
            </div>

            <p className="text-gray-700 leading-relaxed mb-6 whitespace-pre-line">
              {product.description || "No description provided."}
            </p>

            <div className="flex flex-wrap gap-3">
              <span className="text-xs font-medium bg-gray-100 text-gray-700 px-3 py-1 rounded-full">
                Category: {product.category || "N/A"}
              </span>
              {product.createdAt && (
                <span className="text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-full">
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

          {/* ===== Right: Seller Info & Chat ===== */}
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 shadow-sm">
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
              className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-all duration-200 shadow-md disabled:opacity-70"
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
      </div>
    </div>
  );
};

export default ViewProduct;
