import React from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchProductByCategory } from "../../api/product";
import ProductCard from "../../components/ProductCard";
import toast from "react-hot-toast";

// ===== Spinner Overlay =====
const SpinnerOverlay = () => (
  <div className="fixed inset-0 flex items-center justify-center bg-white/70 backdrop-blur-sm z-50">
    <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
  </div>
);

const CategoryPage = () => {
  const { categoryName } = useParams();

  const {
    data: products = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["productsByCategory", categoryName],
    queryFn: () => fetchProductByCategory(categoryName),
    staleTime: 1000 * 60 * 10, // cache for 10 minutes
  });

  if (isError) toast.error("Failed to load products for this category.");

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 via-white to-indigo-50 font-sans text-gray-800">
      {isLoading && <SpinnerOverlay />}

      {/* ===== Hero Section ===== */}
      <section className="relative py-24 px-6 text-center overflow-hidden bg-linear-to-r from-indigo-600 via-blue-600 to-indigo-700 text-white shadow-lg rounded-b-3xl">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>

        <div className="relative z-10 max-w-3xl mx-auto">
          <h1 className="text-5xl font-extrabold mb-4 capitalize drop-shadow-sm tracking-tight">
            {categoryName}
          </h1>
          <p className="text-lg text-indigo-100 max-w-xl mx-auto leading-relaxed">
            Explore the best{" "}
            <span className="font-semibold capitalize">{categoryName}</span>{" "}
            products — curated for quality and value.
          </p>
        </div>
      </section>

      {/* ===== Products Section ===== */}
      <section className="py-16 px-4 sm:px-8 max-w-7xl mx-auto">
        {products.length === 0 && !isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <img
              src="https://illustrations.popsy.co/gray-marketplace.svg"
              alt="No products"
              className="w-60 mb-8 opacity-90"
            />
            <h3 className="text-2xl font-semibold text-gray-800 mb-3">
              No products found
            </h3>
            <p className="text-gray-500 mb-8 max-w-md">
              Be the first one to list a product in this category and start
              selling now!
            </p>
            <Link
              to="/create-product"
              className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-transform duration-200 hover:scale-105 shadow-md"
            >
              List a Product
            </Link>
          </div>
        ) : (
          <>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12 border-b border-gray-200 pb-4">
              <h2 className="text-3xl font-bold text-gray-900 tracking-tight capitalize">
                {categoryName} Products
              </h2>
              <p className="text-gray-500 text-sm mt-3 md:mt-0">
                Showing {products.length}{" "}
                {products.length === 1 ? "item" : "items"}
              </p>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {products.map((product) => (
                <div
                  key={product._id}
                  className="transform transition-all duration-300 hover:-translate-y-2"
                >
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          </>
        )}
      </section>

      {/* ===== Floating Back Button ===== */}
      <Link
        to="/"
        className="fixed bottom-8 left-8 bg-white border border-gray-300 hover:border-gray-400 text-gray-700 hover:text-gray-900 p-4 rounded-full shadow-lg hover:shadow-xl transition-transform duration-300 hover:scale-110 cursor-pointer text-xl"
        title="Back to Home"
      >
        ⬅
      </Link>
    </div>
  );
};

export default CategoryPage;
