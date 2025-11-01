import React from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchProductByCategory } from "../../api/product";
import ProductCard from "../../components/ProductCard";
import toast from "react-hot-toast";

// ===== Spinner Components =====
const SpinnerOverlay = () => (
  <div className="fixed inset-0 flex items-center justify-center bg-white/70 backdrop-blur-sm z-50">
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
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-100 font-sans text-gray-800">
      {isLoading && <SpinnerOverlay />}

      {/* ===== Header Section ===== */}
      <section className="py-20 px-6 bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 text-white text-center shadow-lg">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 capitalize drop-shadow-lg">
          {categoryName}
        </h1>
        <p className="text-lg text-gray-100 max-w-xl mx-auto">
          Explore top deals and items from our {categoryName} collection.
        </p>
      </section>

      {/* ===== Products Section ===== */}
      <section className="py-16 px-4 sm:px-8 max-w-7xl mx-auto">
        {products.length === 0 && !isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <img
              src="https://illustrations.popsy.co/gray-marketplace.svg"
              alt="No products"
              className="w-56 mb-6 opacity-90"
            />
            <h3 className="text-2xl font-semibold text-gray-700 mb-2">
              No products found
            </h3>
            <p className="text-gray-500 mb-6">
              Be the first one to list a product in this category!
            </p>
            <Link
              to="/create-product"
              className="bg-blue-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-700 transition transform hover:scale-105 shadow-md"
            >
              List a Product
            </Link>
          </div>
        ) : (
          <>
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-800 tracking-tight">
              {categoryName} Products
            </h2>

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
        className="fixed bottom-8 left-8 bg-gray-800 text-white p-4 rounded-full shadow-lg hover:bg-gray-700 transition transform hover:scale-110 cursor-pointer text-xl"
      >
        ⬅
      </Link>
    </div>
  );
};

export default CategoryPage;
