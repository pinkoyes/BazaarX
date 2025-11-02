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
      ? "https://media.licdn.com/dms/image/v2/C560BAQHggYLcXxs78w/company-logo_200_200/company-logo_200_200/0/1630638664845/razorpay_logo?e=2147483647&v=beta&t=6QV9K9jZitPNz5dcZx-buB-sHzOkyynJY_a6hRN5hQM"
      : "https://cdn-icons-png.flaticon.com/512/3061/3061341.png";

  const productImage =
    product.media?.[0]?.url ||
    "https://cdn-icons-png.flaticon.com/512/679/679720.png";

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-12">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="px-8 py-6 bg-linear-to-r from-gray-600 to-gray-300 text-white">
          <h1 className="text-2xl font-semibold">Checkout & Payment</h1>
          <p className="text-blue-100 text-sm mt-1">
            Securely complete your order below
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 p-8">
          {/* Left - Address + Payment */}
          <div>
            {/* Delivery Address */}
            <div className="mb-10">
              <h2 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                <span className="text-indigo-600">📍</span> Delivery Address
              </h2>

              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Street / Building / Landmark"
                  value={address.street}
                  onChange={(e) =>
                    setAddress({ ...address, street: e.target.value })
                  }
                  className="w-full border border-slate-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                />
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="City"
                    value={address.city}
                    onChange={(e) =>
                      setAddress({ ...address, city: e.target.value })
                    }
                    className="w-full border border-slate-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                  />
                  <input
                    type="text"
                    placeholder="State"
                    value={address.state}
                    onChange={(e) =>
                      setAddress({ ...address, state: e.target.value })
                    }
                    className="w-full border border-slate-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                  />
                </div>
                <input
                  type="text"
                  placeholder="Pincode"
                  value={address.pincode}
                  onChange={(e) =>
                    setAddress({ ...address, pincode: e.target.value })
                  }
                  className="w-full border border-slate-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                />
              </div>
            </div>

            {/* Payment Method */}
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                <span className="text-indigo-600">💳</span> Payment Method
              </h2>

              <div className="space-y-3">
                <label className="flex items-center gap-3 cursor-pointer border border-slate-300 p-3 rounded-lg hover:border-indigo-500 transition">
                  <input
                    type="radio"
                    name="payment"
                    value="cod"
                    checked={paymentMethod === "cod"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="accent-indigo-600"
                  />
                  <span className="text-slate-700 font-medium">
                    Cash on Delivery (COD)
                  </span>
                </label>

                <label className="flex items-center gap-3 cursor-pointer border border-slate-300 p-3 rounded-lg hover:border-indigo-500 transition">
                  <input
                    type="radio"
                    name="payment"
                    value="online"
                    checked={paymentMethod === "online"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="accent-indigo-600"
                  />
                  <span className="text-slate-700 font-medium">
                    Pay Online (Recommended)
                  </span>
                </label>

                {paymentMethod === "online" && (
                  <div className="mt-4 bg-slate-50 border border-slate-200 p-4 rounded-lg flex items-center justify-between">
                    <div>
                      <p className="text-sm text-slate-600">
                        Securely processed via
                      </p>
                      <p className="font-semibold text-indigo-600">Razorpay</p>
                    </div>
                    <img
                      src={merchantLogo}
                      alt="Merchant"
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
              className="w-full bg-linear-to-r bg-gray-600 text-white py-3 rounded-lg font-medium hover:bg-gray-700 transition-all duration-200 shadow-md disabled:opacity-70 cursor-pointer"
            >
              {orderMutation.isPending
                ? "Processing Order..."
                : "Confirm & Place Order"}
            </button>
          </div>

          {/* Right - Summary */}
          <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
            <h2 className="text-lg font-semibold text-slate-800 mb-5">
              Order Summary
            </h2>

            <div className="flex items-center gap-4 border-b pb-5 mb-5">
              <img
                src={productImage}
                alt={product.title}
                className="w-28 h-28 object-cover rounded-lg border border-slate-200 bg-white"
              />
              <div>
                <h3 className="text-slate-800 font-medium">{product.title}</h3>
                <p className="text-slate-500 text-sm mt-1">
                  Category: {product.category}
                </p>
                <p className="text-indigo-600 font-semibold text-lg mt-2">
                  ₹{product.price?.toLocaleString()}
                </p>
              </div>
            </div>

            <div className="space-y-2 text-slate-700">
              <div className="flex justify-between">
                <span>Product Price</span>
                <span>₹{product.price?.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery</span>
                <span className="text-green-600">Free</span>
              </div>
              <div className="border-t mt-3 pt-3 flex justify-between font-semibold text-slate-800 text-lg">
                <span>Total</span>
                <span>₹{product.price?.toLocaleString()}</span>
              </div>
            </div>

            <p className="text-xs text-slate-500 mt-4">
              By placing your order, you agree to our{" "}
              <span className="text-indigo-600 cursor-pointer hover:underline">
                Terms & Conditions
              </span>{" "}
              and{" "}
              <span className="text-indigo-600 cursor-pointer hover:underline">
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
