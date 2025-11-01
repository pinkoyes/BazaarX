import React from "react";

const Spinner = ({ fullScreen = true, size = "lg", text = "Loading..." }) => {
  const sizeClasses = {
    sm: "w-5 h-5 border-2",
    md: "w-8 h-8 border-3",
    lg: "w-12 h-12 border-4",
  };

  return (
    <div
      className={`${
        fullScreen
          ? "fixed inset-0 flex flex-col items-center justify-center bg-white/70 z-50"
          : "flex flex-col items-center justify-center py-6"
      }`}
    >
      <div
        className={`animate-spin rounded-full border-blue-500 border-t-transparent ${sizeClasses[size]}`}
      ></div>
      {text && (
        <p className="mt-3 text-gray-600 text-sm font-medium tracking-wide">
          {text}
        </p>
      )}
    </div>
  );
};

export default Spinner;
