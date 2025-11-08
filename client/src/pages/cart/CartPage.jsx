import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getMyCart, removeFromCart, updateCartQuantity } from "../../api/cart";
import { FiTrash2, FiPlus, FiMinus, FiShoppingCart } from "react-icons/fi";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

const CartPage = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  // Fetch cart data
  const { data, isLoading, isError } = useQuery({
    queryKey: ["cart"],
    queryFn: getMyCart,
  });

  const cart = data;
  const cartItems = cart?.items || [];

  // Remove item
  const removeMutation = useMutation({
    mutationFn: removeFromCart,
    onSuccess: () => {
      queryClient.invalidateQueries(["cart"]);
      toast.success("Item removed from cart!");
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || "Failed to remove item");
    },
  });

  // Update quantity
  const updateQuantityMutation = useMutation({
    mutationFn: ({ productId, quantity }) =>
      updateCartQuantity(productId, quantity),
    onSuccess: () => {
      queryClient.invalidateQueries(["cart"]);
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || "Failed to update quantity");
    },
  });

  const handleRemove = (productId) => {
    removeMutation.mutate(productId);
  };

  const handleQuantityChange = (productId, currentQuantity, delta) => {
    const newQuantity = currentQuantity + delta;
    if (newQuantity < 1) return;
    updateQuantityMutation.mutate({ productId, quantity: newQuantity });
  };

  // ✅ Ensure real numeric price
  const parsePrice = (price) => {
    const parsed = Number(price);
    return isNaN(parsed) ? 0 : parsed;
  };

  // ✅ Calculate subtotal accurately
  const subtotal = cartItems.reduce(
    (acc, item) => acc + parsePrice(item.productId.price) * item.quantity,
    0
  );

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-[70vh] text-gray-500 text-lg animate-pulse">
        Loading your cart...
      </div>
    );

  if (isError)
    return (
      <div className="flex justify-center items-center h-[70vh] text-red-500 text-lg">
        Failed to load cart.
      </div>
    );

  if (cartItems.length === 0)
    return (
      <div className="flex flex-col items-center justify-center h-[70vh] text-gray-700">
        <FiShoppingCart size={60} className="mb-4 text-gray-500" />
        <h2 className="text-3xl font-semibold mb-3">Your cart is empty 🛒</h2>
        <Link
          to="/"
          className="px-6 py-3 bg-linear-to-r from-blue-600 to-indigo-600 text-white rounded-2xl font-medium hover:scale-105 transform transition-all duration-200 shadow-md"
        >
          Continue Shopping
        </Link>
      </div>
    );

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-blue-50 px-4 py-12">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-10 text-gray-800 flex items-center gap-3">
          <FiShoppingCart className="text-blue-600" /> My Cart
        </h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* --- Cart Items --- */}
          <div className="lg:col-span-2 space-y-6">
            {cartItems.map((item) => {
              const product = item.productId;
              const productPrice = parsePrice(product.price);
              const totalPrice = productPrice * item.quantity;

              return (
                <div
                  key={item._id || product._id}
                  className="flex flex-col md:flex-row justify-between items-center bg-white shadow-xl hover:shadow-2xl transition-shadow duration-300 rounded-2xl p-5 border border-gray-100"
                >
                  {/* Product Info */}
                  <div
                    className="flex items-center gap-5 w-full md:w-auto cursor-pointer group"
                    onClick={() => navigate(`/product/${product._id}`)}
                  >
                    <div className="relative">
                      <img
                        src={product.media?.[0]?.url || "/placeholder.jpg"}
                        alt={product.title}
                        className="w-28 h-28 object-cover rounded-xl shadow-md group-hover:scale-105 transition-transform duration-200"
                      />
                      <div className="absolute inset-0 rounded-xl bg-black/0 group-hover:bg-black/10 transition-all"></div>
                    </div>

                    <div>
                      <h3 className="font-semibold text-lg text-gray-800 group-hover:text-blue-700 transition-colors">
                        {product.title}
                      </h3>
                      <p className="text-gray-500 text-sm line-clamp-2 max-w-xs">
                        {product.description}
                      </p>

                      {/* ✅ Real Product Price */}
                      <p className="text-gray-800 font-semibold mt-1">
                        ₹{productPrice.toLocaleString("en-IN")}
                      </p>
                    </div>
                  </div>

                  {/* Quantity + Actions */}
                  <div className="flex items-center gap-6 mt-5 md:mt-0">
                    <div className="flex items-center gap-2 bg-gray-100 border border-gray-200 px-3 py-2 rounded-xl shadow-inner">
                      <button
                        onClick={() =>
                          handleQuantityChange(product._id, item.quantity, -1)
                        }
                        className="p-1 text-gray-600 hover:text-red-600 transition"
                      >
                        <FiMinus />
                      </button>
                      <span className="font-medium text-gray-800 w-6 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          handleQuantityChange(product._id, item.quantity, +1)
                        }
                        className="p-1 text-gray-600 hover:text-green-600 transition"
                      >
                        <FiPlus />
                      </button>
                    </div>

                    {/* ✅ Show total for this product */}
                    <span className="text-gray-800 font-semibold text-lg">
                      ₹{totalPrice.toLocaleString("en-IN")}
                    </span>

                    <button
                      onClick={() => handleRemove(product._id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-xl transition-all"
                      title="Remove item"
                    >
                      <FiTrash2 size={18} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* --- Order Summary --- */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 h-fit sticky top-24">
            <h3 className="text-2xl font-semibold mb-6 text-gray-800 border-b pb-3">
              Order Summary
            </h3>

            <div className="space-y-3 text-gray-700">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{subtotal.toLocaleString("en-IN")}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery</span>
                <span className="text-green-600 font-medium">Free</span>
              </div>
            </div>

            <div className="flex justify-between font-bold text-xl mt-6 text-gray-900 border-t pt-4">
              <span>Total</span>
              <span>₹{subtotal.toLocaleString("en-IN")}</span>
            </div>

            <button className="mt-8 w-full bg-linear-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-xl font-semibold hover:scale-[1.02] transition-all duration-200 shadow-md">
              Proceed to Checkout
            </button>

            <Link
              to="/"
              className="block text-center text-sm mt-5 text-blue-600 hover:underline"
            >
              ← Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
