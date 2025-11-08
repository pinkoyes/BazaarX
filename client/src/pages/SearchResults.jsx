import React from "react";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { searchProducts } from "../api/product";
import ProductCard from "../components/ProductCard";

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");

  const {
    data: products = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["searchProducts", query],
    queryFn: () => searchProducts(query),
    enabled: !!query, // Only run when query exists
  });

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );

  if (isError)
    return (
      <div className="text-center py-20 text-gray-600">
        Failed to fetch search results.
      </div>
    );

  return (
    <div className="min-h-screen py-10 px-4 sm:px-8 bg-gray-50">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        Search Results for "{query}"
      </h1>

      {products.length === 0 ? (
        <p className="text-center text-gray-500">No products found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResults;
