import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const LandingPage = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  if (isAuthenticated) navigate("/home");

  return (
    <div className="relative w-full h-screen overflow-hidden bg-linear-to-br from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center text-white">
      {/* ===== Abstract Floating Shapes ===== */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-purple-400 rounded-full opacity-20 blur-3xl animate-pulseSlow"></div>
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-yellow-400 rounded-full opacity-20 blur-3xl animate-pulseSlow delay-500"></div>

      {/* ===== Hero Content ===== */}
      <div className="relative z-10 text-center max-w-3xl px-6 sm:px-10 md:px-16">
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold leading-tight mb-6 animate-fadeIn drop-shadow-lg">
          Discover, <span className="text-yellow-400">Buy</span> &{" "}
          <span className="text-yellow-400">Sell</span> Effortlessly
        </h1>

        <p className="text-base sm:text-lg md:text-xl text-white/80 mb-10 animate-fadeIn delay-200 leading-relaxed">
          Connect with a vibrant community and find treasures at your
          fingertips. Trade anything, anytime, anywhere — all in one secure
          place.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4 animate-fadeIn delay-400">
          <Link
            to="/auth/register"
            className="bg-yellow-400 text-gray-900 font-semibold px-8 py-3 rounded-lg shadow-md hover:bg-yellow-500 hover:scale-105 transition-all duration-300"
          >
            Get Started
          </Link>
          <Link
            to="/learn-more"
            className="border-2 border-white text-white font-semibold px-8 py-3 rounded-lg shadow-md hover:bg-white hover:text-gray-900 hover:scale-105 transition-all duration-300"
          >
            Learn More
          </Link>
        </div>
      </div>

      {/* ===== Footer or Tagline ===== */}
      <div className="absolute bottom-6 text-center text-white/70 text-sm sm:text-base">
        © {new Date().getFullYear()} MarketHub • Built for buyers and sellers
      </div>

      {/* ===== Custom Animations ===== */}
      <style>{`
        @keyframes fadeIn {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn { animation: fadeIn 1s ease forwards; }
        .animate-fadeIn.delay-200 { animation-delay: 0.2s; }
        .animate-fadeIn.delay-400 { animation-delay: 0.4s; }

        @keyframes pulseSlow {
          0%, 100% { transform: scale(1); opacity: 0.2; }
          50% { transform: scale(1.3); opacity: 0.35; }
        }
        .animate-pulseSlow { animation: pulseSlow 10s ease-in-out infinite; }
        .animate-pulseSlow.delay-500 { animation-delay: 3s; }
      `}</style>
    </div>
  );
};

export default LandingPage;
