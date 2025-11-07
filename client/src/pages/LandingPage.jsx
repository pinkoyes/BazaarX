import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";

const LandingPage = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  if (isAuthenticated) navigate("/home");

  return (
    <div className="relative w-full min-h-[calc(100vh-7rem)] bg-linear-to-br from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center text-white overflow-hidden">
      {/* ===== Background Blobs ===== */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.25, scale: 1 }}
        transition={{ duration: 2 }}
        className="absolute -top-32 -left-32 w-md h-112 bg-purple-400 rounded-full blur-3xl"
      ></motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.25, scale: 1 }}
        transition={{ duration: 2, delay: 0.5 }}
        className="absolute -bottom-40 -right-40 w-120 h-120 bg-yellow-400 rounded-full blur-3xl"
      ></motion.div>

      {/* ===== Hero Content ===== */}
      <div className="relative z-10 text-center px-6 sm:px-10 md:px-16 max-w-4xl">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-4xl sm:text-6xl md:text-7xl font-extrabold leading-tight mb-6 tracking-tight drop-shadow-lg"
        >
          Discover, <span className="text-yellow-400">Buy</span> &{" "}
          <span className="text-yellow-400">Sell</span> Effortlessly
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-base sm:text-lg md:text-xl text-white/90 mb-10 leading-relaxed max-w-2xl mx-auto"
        >
          Join a vibrant community where trading feels natural. Explore
          thousands of products, connect directly with sellers, and enjoy a
          seamless shopping experience — all on{" "}
          <span className="font-semibold text-yellow-300">BazaarX</span>.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col sm:flex-row justify-center gap-4"
        >
          <Link
            to="/auth/register"
            className="bg-yellow-400 text-gray-900 font-semibold px-10 py-3 rounded-lg shadow-lg hover:bg-yellow-500 hover:scale-105 transition-all duration-300"
          >
            Get Started
          </Link>
          <Link
            to="/learn-more"
            className="border-2 border-white text-white font-semibold px-10 py-3 rounded-lg shadow-lg hover:bg-white hover:text-gray-900 hover:scale-105 transition-all duration-300"
          >
            Learn More
          </Link>
        </motion.div>
      </div>

      {/* ===== Subtle Floating Elements ===== */}
      <motion.img
        src="https://cdn-icons-png.flaticon.com/512/711/711239.png"
        alt="Shopping Icon"
        initial={{ opacity: 0, y: 80 }}
        animate={{ opacity: 0.15, y: [80, 100, 80] }}
        transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
        className="absolute bottom-10 left-10 w-20 sm:w-28 pointer-events-none select-none"
      />

      <motion.img
        src="https://cdn-icons-png.flaticon.com/512/1170/1170627.png"
        alt="Cart Icon"
        initial={{ opacity: 0, y: -60 }}
        animate={{ opacity: 0.15, y: [-60, -80, -60] }}
        transition={{
          repeat: Infinity,
          duration: 5,
          delay: 1,
          ease: "easeInOut",
        }}
        className="absolute top-16 right-16 w-16 sm:w-24 pointer-events-none select-none"
      />
    </div>
  );
};

export default LandingPage;
