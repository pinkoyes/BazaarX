import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchProductsForHomePage, fetchAllCategories } from "../api/product";
import ProductCard from "../components/ProductCard";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

const SpinnerOverlay = () => (
  <div className="fixed inset-0 flex items-center justify-center bg-white/70 backdrop-blur-sm z-50">
    <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
  </div>
);

const Spinner = () => (
  <div className="flex justify-center items-center h-40">
    <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
  </div>
);

const Home = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const {
    data: categories = [],
    isLoading: categoryLoading,
    isError: categoryError,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchAllCategories,
    staleTime: 1000 * 60 * 10,
  });

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
    <div className="min-h-screen bg-linear-to-b from-gray-50 via-gray-100 to-white text-gray-800">
      {(categoryLoading || productLoading) && <SpinnerOverlay />}

      {/* ===== Hero Section ===== */}
      <section className="relative flex flex-col items-center justify-center text-center py-28 px-6 overflow-hidden bg-linear-to-r from-indigo-600 via-purple-600 to-pink-600 text-white">
        <motion.img
          src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1600&q=80"
          alt="marketplace background"
          className="absolute inset-0 w-full h-full object-cover opacity-20"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 10, repeat: Infinity, repeatType: "mirror" }}
        />

        <div className="relative z-10 max-w-3xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl sm:text-6xl font-extrabold mb-5 leading-tight drop-shadow-lg"
          >
            Discover, Buy & Sell Effortlessly
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg sm:text-xl mb-10 text-gray-100"
          >
            Your one-stop marketplace — fast, secure, and beautifully simple.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row justify-center gap-3 w-full sm:w-auto"
          >
            <div className="relative w-full sm:w-96">
              <input
                type="text"
                placeholder="Search products or categories..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-5 pr-12 py-3 rounded-xl border border-white/40 bg-white/10 text-white placeholder-white/70 backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-white/70 transition-all"
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
              className="bg-white text-indigo-700 font-semibold px-8 py-3 rounded-xl hover:bg-indigo-100 transition shadow-md"
            >
              Search
            </button>
          </motion.div>
        </div>
      </section>

      {/* ===== Categories Section ===== */}
      <section className="py-20 px-4 sm:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl font-bold text-center mb-12 text-gray-800 tracking-tight"
        >
          🛍️ Explore Top Categories
        </motion.h2>

        {categories.length === 0 ? (
          <p className="text-center text-gray-500">No categories found.</p>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8 max-w-7xl mx-auto"
          >
            {categories.slice(0, 6).map((cat, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.05 }}
                onClick={() => handleCategoryClick(cat.category)}
                className="group relative rounded-2xl overflow-hidden shadow-md cursor-pointer bg-white hover:shadow-2xl transition-all duration-300"
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
              </motion.div>
            ))}
          </motion.div>
        )}
      </section>

      {/* ===== Featured Products Section ===== */}
      <section className="py-20 px-4 sm:px-8 bg-gray-50 border-t border-gray-200">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl font-bold text-center mb-12 text-gray-800 tracking-tight"
        >
          ⭐ Featured Products
        </motion.h2>

        {productLoading ? (
          <Spinner />
        ) : products.length === 0 ? (
          <p className="text-center text-gray-500">No products available.</p>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-7xl mx-auto"
          >
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </motion.div>
        )}
      </section>

      {/* ===== CTA Section ===== */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="py-24 px-6 bg-linear-to-r from-indigo-100 via-purple-100 to-pink-100 text-center mx-4 sm:mx-10 lg:mx-32 mt-16 rounded-3xl shadow-xl"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Ready to Sell Your Product?
        </h2>
        <p className="mb-8 text-gray-700 text-lg max-w-xl mx-auto">
          Join thousands of sellers and start earning today on our trusted
          marketplace.
        </p>
        <Link
          to="/create-product"
          className="bg-indigo-600 text-white px-10 py-3 sm:py-4 rounded-full font-semibold hover:bg-indigo-700 transition transform hover:scale-105 shadow-lg"
        >
          List Your Product Now
        </Link>
      </motion.section>

      {/* ===== Floating Add Button ===== */}
      <Link
        to="/create-product"
        className="fixed bottom-8 right-8 bg-indigo-600 text-white p-5 rounded-full shadow-xl hover:bg-indigo-700 transition transform hover:scale-110 cursor-pointer text-2xl"
      >
        ➕
      </Link>
    </div>
  );
};

export default Home;
