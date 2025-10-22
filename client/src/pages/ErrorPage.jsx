import React from "react";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-gray-700 px-6 text-center">
      {/* Error code */}
      <h1 className="text-7xl md:text-9xl font-extrabold text-white mb-6 animate-fadeIn">
        404
      </h1>

      {/* Error message */}
      <p className="text-xl md:text-2xl text-white/90 mb-8 animate-fadeIn delay-200">
        Oops! The page you are looking for does not exist.
      </p>

      {/* Go Home button */}
      <Link
        to="/"
        className="px-8 py-3 bg-yellow-400 text-gray-900 font-semibold rounded-lg shadow-lg hover:bg-yellow-500 transition-all duration-300 animate-fadeIn delay-400"
      >
        Go to Home
      </Link>

      {/* Animations */}
      <style>
        {`
          @keyframes fadeIn {
            0% { opacity: 0; transform: translateY(20px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          .animate-fadeIn { animation: fadeIn 1s ease forwards; }
          .animate-fadeIn.delay-200 { animation-delay: 0.2s; }
          .animate-fadeIn.delay-400 { animation-delay: 0.4s; }
        `}
      </style>
    </div>
  );
};

export default ErrorPage;
