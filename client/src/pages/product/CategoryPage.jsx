import React from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchProductByCategory } from "../../api/product";
import ProductCard from "../../components/ProductCard";
import toast from "react-hot-toast";

// ===== Spinner Components =====
const SpinnerOverlay = () => (
  <div className="fixed inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm z-50">
    <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
  </div>
);

const CategoryPage = () => {
  const { categoryName } = useParams();

  // Fetch products by category using TanStack Query
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
    <div className="min-h-screen bg-linear-to-b from-gray-50 via-white to-gray-100 font-sans text-gray-800">
      {isLoading && <SpinnerOverlay />}

      {/* ===== Hero Section ===== */}
      <section className="relative py-20 px-6 text-center overflow-hidden bg-linear-to-r from-blue-700 via-indigo-600 to-purple-600 text-white shadow-md">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/diagonal-noise.png')] opacity-20"></div>

        <div className="relative z-10 max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-3 capitalize drop-shadow-sm">
            {categoryName}
          </h1>
          <p className="text-lg text-blue-100 max-w-xl mx-auto">
            Discover exclusive deals and handpicked items from our{" "}
            <span className="capitalize font-semibold">{categoryName}</span>{" "}
            collection.
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
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition transform hover:scale-105 shadow-md"
            >
              List a Product
            </Link>
          </div>
        ) : (
          <>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12">
              <h2 className="text-3xl font-bold text-gray-900 tracking-tight capitalize">
                {categoryName} Products
              </h2>
              <p className="text-gray-500 text-sm mt-3 md:mt-0">
                Showing {products.length}{" "}
                {products.length === 1 ? "item" : "items"}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          </>
        )}
      </section>

      {/* ===== Floating Back Button ===== */}
      <Link
        to="/"
        className="fixed bottom-8 left-8 bg-gray-800 hover:bg-gray-900 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-transform duration-300 hover:scale-110 cursor-pointer text-xl"
        title="Back to Home"
      >
        ⬅
      </Link>
    </div>
  );
};

export default CategoryPage;
