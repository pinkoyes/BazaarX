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
    staleTime: 1000 * 60 * 2,
  });

  const orderMutation = useMutation({
    mutationFn: (data) => placeOrder(data),
    onSuccess: () => {
      toast.success("Order placed successfully!");
      navigate("/home");
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || "Order failed");
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

  const merchantLogo =
    paymentMethod === "online"
      ? "https://upload.wikimedia.org/wikipedia/commons/6/6a/Razorpay_logo.svg"
      : "https://cdn-icons-png.flaticon.com/512/3061/3061341.png";

  const productImage =
    product.media?.[0]?.url ||
    "https://cdn-icons-png.flaticon.com/512/679/679720.png";

  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-50 via-white to-blue-50 py-14 px-4 sm:px-8 lg:px-16 font-sans text-gray-800">
      <div className="max-w-6xl mx-auto bg-white/90 backdrop-blur-md border border-gray-200 rounded-3xl shadow-lg overflow-hidden">
        {/* === Header === */}
        <div className="px-10 py-8 bg-linear-to-r from-indigo-600 via-blue-600 to-indigo-700 text-white">
          <h1 className="text-3xl font-bold">Checkout & Payment</h1>
          <p className="text-indigo-100 text-sm mt-2">
            Securely complete your order below
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 p-10">
          {/* === Left: Address + Payment === */}
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
                  className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition bg-white/80"
                />
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="City"
                    value={address.city}
                    onChange={(e) =>
                      setAddress({ ...address, city: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition bg-white/80"
                  />
                  <input
                    type="text"
                    placeholder="State"
                    value={address.state}
                    onChange={(e) =>
                      setAddress({ ...address, state: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition bg-white/80"
                  />
                </div>
                <input
                  type="text"
                  placeholder="Pincode"
                  value={address.pincode}
                  onChange={(e) =>
                    setAddress({ ...address, pincode: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition bg-white/80"
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
                <label className="flex items-center justify-between border border-gray-300 p-4 rounded-xl cursor-pointer hover:border-indigo-500 transition bg-white/80">
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="payment"
                      value="cod"
                      checked={paymentMethod === "cod"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="accent-indigo-600"
                    />
                    <span className="text-gray-700 font-medium">
                      Cash on Delivery
                    </span>
                  </div>
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/1252/1252354.png"
                    alt="COD"
                    className="h-6 opacity-80"
                  />
                </label>

                <label className="flex items-center justify-between border border-gray-300 p-4 rounded-xl cursor-pointer hover:border-indigo-500 transition bg-white/80">
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="payment"
                      value="online"
                      checked={paymentMethod === "online"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="accent-indigo-600"
                    />
                    <span className="text-gray-700 font-medium">
                      Pay Online (Recommended)
                    </span>
                  </div>
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/6/6a/Razorpay_logo.svg"
                    alt="Razorpay"
                    className="h-6"
                  />
                </label>

                {paymentMethod === "online" && (
                  <div className="mt-4 bg-indigo-50 border border-indigo-200 p-4 rounded-xl flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">
                        Securely processed via
                      </p>
                      <p className="font-semibold text-indigo-700">
                        Razorpay Gateway
                      </p>
                    </div>
                    <img
                      src={merchantLogo}
                      alt="Payment Gateway"
                      className="h-8 object-contain"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Place Order Button */}
            <button
              onClick={handlePlaceOrder}
              disabled={orderMutation.isPending}
              className="w-full bg-linear-to-r from-indigo-600 to-blue-600 text-white py-3 rounded-xl font-semibold text-lg hover:from-indigo-700 hover:to-blue-700 transition-all shadow-md hover:shadow-lg disabled:opacity-60"
            >
              {orderMutation.isPending
                ? "Processing Order..."
                : "Confirm & Place Order"}
            </button>
          </div>

          {/* === Right: Summary === */}
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

            <p className="text-xs text-gray-500 mt-5">
              By placing your order, you agree to our{" "}
              <span className="text-indigo-600 hover:underline cursor-pointer">
                Terms & Conditions
              </span>{" "}
              and{" "}
              <span className="text-indigo-600 hover:underline cursor-pointer">
                Privacy Policy
              </span>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
