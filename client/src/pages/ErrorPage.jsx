import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiHome } from "react-icons/fi";

const ErrorPage = () => {
  return (
    <div className="relative w-full h-screen flex flex-col items-center justify-center bg-gray-900 text-gray-100 overflow-hidden px-6 text-center">
      {/* === Floating accent glows === */}
      <motion.div
        className="absolute top-24 left-12 w-64 h-64 bg-yellow-400/10 blur-3xl rounded-full"
        animate={{
          y: [0, 25, 0],
          x: [0, -10, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 7,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-10 right-12 w-72 h-72 bg-orange-500/10 blur-3xl rounded-full"
        animate={{
          y: [0, -20, 0],
          x: [0, 15, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 6,
          ease: "easeInOut",
        }}
      />

      {/* === Main Card === */}
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 bg-gray-800/80 backdrop-blur-sm rounded-3xl shadow-xl px-10 py-14 md:px-16 md:py-20 max-w-2xl border border-gray-700"
      >
        {/* Error Code */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-7xl md:text-8xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-yellow-400 to-orange-500 drop-shadow-[0_0_12px_rgba(255,180,0,0.3)]"
        >
          404
        </motion.h1>

        {/* Message */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-lg md:text-xl text-gray-300 mt-4 mb-8 leading-relaxed max-w-md mx-auto"
        >
          Oops! The page you’re looking for doesn’t exist or might have been
          moved.
        </motion.p>

        {/* Illustration (visible even on dark backgrounds) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, type: "spring", stiffness: 100 }}
          className="flex justify-center mb-10"
        >
          <div className="relative">
            <img
              src="https://illustrations.popsy.co/blue-astronaut.svg"
              alt="Not Found Illustration"
              className="w-40 md:w-52 mx-auto brightness-110 drop-shadow-[0_0_10px_rgba(255,255,255,0.1)]"
            />
            {/* Soft glow behind image */}
            <div className="absolute inset-0 bg-yellow-400/10 blur-2xl rounded-full -z-10"></div>
          </div>
        </motion.div>

        {/* Button */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 200 }}
        >
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-8 py-3 bg-linear-to-r from-yellow-400 to-orange-500 text-gray-900 font-semibold rounded-full shadow-md hover:shadow-[0_0_20px_rgba(255,200,100,0.4)] transition-all duration-300"
          >
            <FiHome size={20} /> Go Back Home
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ErrorPage;
