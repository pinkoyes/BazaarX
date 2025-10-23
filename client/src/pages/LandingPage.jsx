import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="relative w-full h-screen bg-linear-to-br from-indigo-600 via-purple-600 to-pink-500 overflow-hidden flex items-center justify-center">
      {/* Floating abstract shapes */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-purple-400 rounded-full opacity-30 animate-pulseSlow"></div>
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-yellow-400 rounded-full opacity-30 animate-pulseSlow delay-500"></div>

      {/* Hero content */}
      <div className="relative bottom-20 z-10 text-center px-6 md:px-12">
        <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 leading-tight animate-fadeIn">
          Discover, <span className="text-yellow-400">Buy</span> &{" "}
          <span className="text-yellow-400">Sell</span> Effortlessly
        </h1>
        <p className="text-lg md:text-2xl text-white/80 mb-8 animate-fadeIn delay-200">
          Connect with a vibrant community and find treasures at your
          fingertips. Trade anything, anytime, anywhere.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4 animate-fadeIn delay-400">
          <Link
            to="/auth/register"
            className="bg-yellow-400 text-gray-900 font-semibold px-8 py-3 rounded-lg shadow-xl hover:bg-yellow-500 transition-all duration-300"
          >
            Get Started
          </Link>
          <Link
            to="/learn-more"
            className="bg-transparent border-2 border-white text-white font-semibold px-8 py-3 rounded-lg shadow-xl hover:bg-white hover:text-gray-900 transition-all duration-300"
          >
            Learn More
          </Link>
        </div>
      </div>

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
          @keyframes pulseSlow {
            0%, 100% { transform: scale(1); opacity: 0.3; }
            50% { transform: scale(1.2); opacity: 0.4; }
          }
          .animate-pulseSlow { animation: pulseSlow 8s ease-in-out infinite; }
          .animate-pulseSlow.delay-500 { animation-delay: 2s; }
        `}
      </style>
    </div>
  );
};

export default LandingPage;
