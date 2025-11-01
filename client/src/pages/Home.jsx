import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchProductsForHomePage, fetchAllCategories } from "../api/product";
import ProductCard from "../components/ProductCard";
import toast from "react-hot-toast";

// ===== Spinner Components =====
const SpinnerOverlay = () => (
  <div className="fixed inset-0 flex items-center justify-center bg-white/70 backdrop-blur-sm z-50">
    <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
  </div>
);

const Spinner = () => (
  <div className="flex justify-center items-center h-40">
    <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
  </div>
);

const Home = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  // ===== Fetch Categories =====
  const {
    data: categories = [],
    isLoading: categoryLoading,
    isError: categoryError,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchAllCategories,
    staleTime: 1000 * 60 * 10,
  });

  // ===== Fetch Featured Products =====
  const {
    data: products = [],
    isLoading: productLoading,
    isError: productError,
  } = useQuery({
    queryKey: ["homeProducts"],
    queryFn: fetchProductsForHomePage,
    staleTime: 1000 * 60 * 5,
  });

  if (categoryError) toast.error("Failed to load categories");
  if (productError) toast.error("Failed to load featured products");

  const handleCategoryClick = (cat) => {
    navigate(`/category/${encodeURIComponent(cat)}`);
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-gray-100 text-gray-800">
      {(categoryLoading || productLoading) && <SpinnerOverlay />}

      {/* ===== Hero Section ===== */}
      <section className="relative flex flex-col items-center justify-center text-center py-28 px-6 overflow-hidden bg-linear-to-r from-blue-600 via-indigo-500 to-purple-600 text-white">
        <img
          src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1600&q=80"
          alt="marketplace background"
          className="absolute inset-0 w-full h-full object-cover opacity-20"
        />
        <div className="relative z-10 max-w-3xl mx-auto">
          <h1 className="text-5xl sm:text-6xl font-extrabold mb-5 leading-tight drop-shadow-lg">
            Discover, Buy & Sell Effortlessly
          </h1>
          <p className="text-lg sm:text-xl mb-10 text-gray-100">
            A modern marketplace for everything you love — safe, fast, and
            effortless.
          </p>

          {/* ===== Search Bar ===== */}
          <div className="flex flex-col sm:flex-row justify-center gap-3 w-full sm:w-auto">
            <div className="relative w-full sm:w-96">
              <input
                type="text"
                placeholder="Search products or categories..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-5 pr-12 py-3 rounded-xl border border-white/30 bg-white/10 text-white placeholder-white/70 backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-white/70 transition-all"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 text-gray-200 absolute right-4 top-1/2 -translate-y-1/2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1110 3a7.5 7.5 0 016.65 13.65z"
                />
              </svg>
            </div>
            <button
              onClick={() => toast("Search feature coming soon!")}
              className="bg-white text-blue-700 font-semibold px-8 py-3 rounded-xl hover:bg-blue-100 transition shadow-md"
            >
              Search
            </button>
          </div>
        </div>
      </section>

      {/* ===== Categories Section ===== */}
      <section className="py-20 px-4 sm:px-8">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800 tracking-tight">
          🛍️ Explore Top Categories
        </h2>

        {categories.length === 0 ? (
          <p className="text-center text-gray-500">No categories found.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8 max-w-7xl mx-auto">
            {categories.slice(0, 6).map((cat, i) => (
              <div
                key={i}
                onClick={() => handleCategoryClick(cat.category)}
                className="group relative rounded-2xl overflow-hidden shadow-md cursor-pointer bg-white hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <img
                  src={
                    cat.image ||
                    `https://via.placeholder.com/400x300?text=${cat.category}`
                  }
                  alt={cat.category}
                  className="w-full h-44 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/30 to-transparent flex items-end justify-center pb-4">
                  <span className="text-white font-semibold text-lg tracking-wide">
                    {cat.category}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ===== Featured Products Section ===== */}
      <section className="py-20 px-4 sm:px-8 bg-gray-50 border-t border-gray-200">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800 tracking-tight">
          ⭐ Featured Products
        </h2>

        {productLoading ? (
          <Spinner />
        ) : products.length === 0 ? (
          <p className="text-center text-gray-500">No products available.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* ===== CTA Section ===== */}
      <section className="py-24 px-6 bg-linear-to-r from-blue-100 via-indigo-100 to-purple-100 text-center mx-4 sm:mx-10 lg:mx-32 mt-16 rounded-3xl shadow-xl">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Ready to Sell Your Product?
        </h2>
        <p className="mb-8 text-gray-700 text-lg max-w-xl mx-auto">
          Join thousands of sellers and start earning today on our trusted
          marketplace.
        </p>
        <Link
          to="/create-product"
          className="bg-blue-600 text-white px-8 sm:px-10 py-3 sm:py-4 rounded-full font-semibold hover:bg-blue-700 transition transform hover:scale-105 shadow-lg"
        >
          List Your Product Now
        </Link>
      </section>

      {/* ===== Floating Add Button ===== */}
      <Link
        to="/create-product"
        className="fixed bottom-8 right-8 bg-blue-600 text-white p-5 rounded-full shadow-lg hover:bg-blue-700 transition transform hover:scale-110 cursor-pointer text-2xl"
      >
        ➕
      </Link>
    </div>
  );
};

export default Home;
