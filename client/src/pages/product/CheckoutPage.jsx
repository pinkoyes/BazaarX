import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import { fetchProductById } from "../../api/product";
import { placeOrder } from "../../api/order";
import Spinner from "../../components/ui/Spinner";
import toast from "react-hot-toast";

const CheckoutPage = () => {
  const { productId } = useParams();
  const navigate = useNavigate();

  const [address, setAddress] = useState({
    street: "",
    city: "",
    state: "",
    pincode: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("cod");

  const { data: product, isLoading } = useQuery({
    queryKey: ["product", productId],
    queryFn: () => fetchProductById(productId),
    staleTime: 0,
    cacheTime: 0,
  });

  const orderMutation = useMutation({
    mutationFn: (data) => placeOrder(data),
    onSuccess: () => {
      toast.success("Order request sent to seller!");
      navigate("/my-orders");
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || "Failed to place order");
    },
  });

  const handlePlaceOrder = () => {
    const { street, city, state, pincode } = address;
    if (!street || !city || !state || !pincode)
      return toast.error("Please fill all address fields");

    orderMutation.mutate({
      productId,
      deliveryAddress: { street, city, state, pincode },
      paymentMethod,
    });
  };

  if (isLoading) return <Spinner />;

  const productImage =
    product?.media?.[0]?.url ||
    "https://cdn-icons-png.flaticon.com/512/679/679720.png";

  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-50 via-white to-blue-50 py-14 px-4 sm:px-8 lg:px-16 font-sans text-gray-800">
      <div className="max-w-6xl mx-auto bg-white/90 backdrop-blur-md border border-gray-200 rounded-3xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="px-10 py-8 bg-linear-to-r from-indigo-600 via-blue-600 to-indigo-700 text-white">
          <h1 className="text-3xl font-bold">Checkout</h1>
          <p className="text-indigo-100 text-sm mt-2">
            Send your order request to the seller
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 p-10">
          {/* Left: Address + Payment */}
          <div>
            {/* Delivery Address */}
            <div className="mb-10">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <span className="text-indigo-600 text-2xl">📍</span> Delivery
                Address
              </h2>

              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Street / Building / Landmark"
                  value={address.street}
                  onChange={(e) =>
                    setAddress({ ...address, street: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded-xl p-3"
                />
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="City"
                    value={address.city}
                    onChange={(e) =>
                      setAddress({ ...address, city: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-xl p-3"
                  />
                  <input
                    type="text"
                    placeholder="State"
                    value={address.state}
                    onChange={(e) =>
                      setAddress({ ...address, state: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-xl p-3"
                  />
                </div>
                <input
                  type="text"
                  placeholder="Pincode"
                  value={address.pincode}
                  onChange={(e) =>
                    setAddress({ ...address, pincode: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded-xl p-3"
                />
              </div>
            </div>

            {/* Payment Method */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <span className="text-indigo-600 text-2xl">💳</span> Payment
                Method
              </h2>

              <div className="space-y-4">
                {["cod", "online"].map((method) => (
                  <label
                    key={method}
                    className={`flex items-center justify-between border p-4 rounded-xl cursor-pointer transition bg-white/80 ${
                      paymentMethod === method
                        ? "border-indigo-500"
                        : "border-gray-300"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="payment"
                        value={method}
                        checked={paymentMethod === method}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="accent-indigo-600"
                      />
                      <span className="text-gray-700 font-medium capitalize">
                        {method === "cod"
                          ? "Cash on Delivery"
                          : "Pay Online (after seller approval)"}
                      </span>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Place Order Button */}
            <button
              onClick={handlePlaceOrder}
              disabled={orderMutation.isPending}
              className="w-full bg-linear-to-r from-indigo-600 to-blue-600 text-white py-3 rounded-xl font-semibold text-lg hover:from-indigo-700 hover:to-blue-700 transition-all shadow-md disabled:opacity-60"
            >
              {orderMutation.isPending
                ? "Sending Request..."
                : "Send Order Request"}
            </button>
          </div>

          {/* Right: Summary */}
          <div className="bg-white/90 border border-gray-200 p-6 rounded-2xl shadow-inner">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Order Summary
            </h2>

            <div className="flex items-center gap-4 border-b border-gray-200 pb-5 mb-5">
              <img
                src={productImage}
                alt={product.title}
                className="w-28 h-28 object-cover rounded-xl border border-gray-200 bg-white"
              />
              <div>
                <h3 className="text-gray-900 font-medium text-lg">
                  {product.title}
                </h3>
                <p className="text-gray-500 text-sm mt-1">
                  Category: {product.category}
                </p>
                <p className="text-indigo-600 font-semibold text-xl mt-2">
                  ₹{product.price?.toLocaleString()}
                </p>
              </div>
            </div>

            <div className="space-y-3 text-gray-700">
              <div className="flex justify-between">
                <span>Product Price</span>
                <span>₹{product.price?.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery</span>
                <span className="text-green-600 font-medium">Free</span>
              </div>
              <div className="border-t border-gray-200 mt-3 pt-3 flex justify-between font-semibold text-gray-900 text-lg">
                <span>Total</span>
                <span>₹{product.price?.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
