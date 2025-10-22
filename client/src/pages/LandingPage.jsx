import { Link } from "react-router-dom";
import {
  FiSearch,
  FiTrendingUp,
  FiShield,
  FiStar,
  FiArrowRight,
  FiPackage,
  FiShoppingBag,
  FiRefreshCcw,
  FiCheck,
  FiPhone,
} from "react-icons/fi";
import { HiOutlineChatAlt2 } from "react-icons/hi";
import { motion } from "framer-motion";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

const LandingPage = () => {
  const features = [
    {
      icon: FiTrendingUp,
      title: "Easy to Use",
      desc: "Simple and intuitive interface for quick transactions",
    },
    {
      icon: FiShield,
      title: "Secure Platform",
      desc: "Advanced security with buyer & seller protection",
    },
    {
      icon: FiPackage,
      title: "Quality Products",
      desc: "Verified listings with detailed descriptions",
    },
    {
      icon: FiShoppingBag,
      title: "Smart Shopping",
      desc: "Compare prices and find the best deals",
    },
  ];

  const categories = [
    {
      name: "Electronics",
      items: "10K+",
      icon: "📱",
      color: "bg-gradient-to-br from-blue-500 to-blue-600",
    },
    {
      name: "Vehicles",
      items: "8K+",
      icon: "🚗",
      color: "bg-gradient-to-br from-green-500 to-green-600",
    },
    {
      name: "Real Estate",
      items: "5K+",
      icon: "🏠",
      color: "bg-gradient-to-br from-purple-500 to-purple-600",
    },
    {
      name: "Fashion",
      items: "15K+",
      icon: "👕",
      color: "bg-gradient-to-br from-pink-500 to-pink-600",
    },
    {
      name: "Home & Garden",
      items: "7K+",
      icon: "🏡",
      color: "bg-gradient-to-br from-teal-500 to-teal-600",
    },
    {
      name: "Sports",
      items: "6K+",
      icon: "⚽",
      color: "bg-gradient-to-br from-red-500 to-red-600",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-linear-to-br from-blue-600 to-purple-700 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="grid grid-cols-3 gap-8 transform rotate-12 scale-150">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="h-64 bg-white rounded-lg"></div>
            ))}
          </div>
        </div>
        <div className="max-w-6xl mx-auto px-4 text-center relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl font-bold mb-6"
          >
            Buy & Sell <span className="text-blue-200">Locally</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto"
          >
            Discover amazing deals near you. Join thousands in your community.
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              to="/browse"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-all hover:scale-105"
            >
              Start Shopping
            </Link>
            <Link
              to="/sell"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-all hover:scale-105"
            >
              Sell Items
            </Link>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-12 flex justify-center space-x-8 text-blue-100"
          >
            <div>
              <div className="text-2xl font-bold">50K+</div>
              <div>Active Users</div>
            </div>
            <div>
              <div className="text-2xl font-bold">100K+</div>
              <div>Items Listed</div>
            </div>
            <div>
              <div className="text-2xl font-bold">95%</div>
              <div>Satisfaction</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      {/* How It Works */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              How Our Platform Works
            </h2>
            <p className="text-lg text-gray-600">
              Simple and secure way to buy and sell items in your local
              community
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            {[
              {
                icon: FiPackage,
                title: "List Your Items",
                desc: "Take photos, set your price, and write a description. List your items in minutes.",
                color: "blue",
              },
              {
                icon: HiOutlineChatAlt2,
                title: "Connect & Chat",
                desc: "Chat with buyers or sellers directly through our secure messaging system.",
                color: "green",
              },
              {
                icon: FiCheck,
                title: "Complete the Sale",
                desc: "Meet safely, exchange items and complete the transaction with confidence.",
                color: "purple",
              },
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="relative"
              >
                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                  <div
                    className={`w-16 h-16 bg-${step.color}-100 rounded-xl flex items-center justify-center mb-6`}
                  >
                    <step.icon className={`w-8 h-8 text-${step.color}-600`} />
                  </div>
                  <h3 className="text-xl font-semibold mb-4">{step.title}</h3>
                  <p className="text-gray-600">{step.desc}</p>
                </div>
                {index < 2 && (
                  <div className="hidden md:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2">
                    <FiArrowRight className="w-6 h-6 text-gray-300" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="text-center mt-16"
          >
            <Link
              to="/how-it-works"
              className="inline-flex items-center text-blue-600 hover:text-blue-700 font-semibold group"
            >
              Learn more about our process
              <FiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Categories */}
      {/* Categories */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Explore Popular Categories
            </h2>
            <p className="text-lg text-gray-600">
              Find what you need or sell what you don't - everything in one
              place
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[
              {
                name: "Electronics",
                items: "15K+",
                icon: "📱",
                bg: "from-blue-500 to-blue-600",
                gradient: "from-blue-500/20 to-blue-600/20",
              },
              {
                name: "Vehicles",
                items: "8K+",
                icon: "🚗",
                bg: "from-green-500 to-green-600",
                gradient: "from-green-500/20 to-green-600/20",
              },
              {
                name: "Home & Garden",
                items: "12K+",
                icon: "🏡",
                bg: "from-purple-500 to-purple-600",
                gradient: "from-purple-500/20 to-purple-600/20",
              },
              {
                name: "Fashion",
                items: "20K+",
                icon: "👕",
                bg: "from-pink-500 to-pink-600",
                gradient: "from-pink-500/20 to-pink-600/20",
              },
            ].map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link
                  to={`/category/${category.name.toLowerCase()}`}
                  className="block group"
                >
                  <div className="relative overflow-hidden rounded-2xl">
                    <div
                      className={`absolute inset-0 bg-linear-to-br ${category.gradient} group-hover:scale-110 transition-transform duration-500`}
                    ></div>
                    <div className="relative p-8">
                      <div
                        className={`w-16 h-16 rounded-xl bg-linear-to-br ${category.bg} flex items-center justify-center mb-6 text-2xl shadow-lg`}
                      >
                        {category.icon}
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {category.name}
                      </h3>
                      <p className="text-gray-600">{category.items} listings</p>
                      <div className="mt-4 inline-flex items-center text-blue-600 font-medium">
                        Browse items
                        <FiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-center mt-16"
          >
            <Link
              to="/categories"
              className="inline-flex items-center px-8 py-4 bg-white text-blue-600 rounded-xl shadow-md hover:shadow-lg transition-all font-semibold group"
            >
              View All Categories
              <FiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Trust Features */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMwMDAiIGZpbGwtb3BhY2l0eT0iLjAyIj48cGF0aCBkPSJNMzYgMzRoLTJ2LTJoMnYyem0wLTRoLTJ2LTJoMnYyem0wLTR2LTJoLTJ2Mmgyem0tNCAwdi0yaC0ydjJoMnptMCA0di0yaC0ydjJoMnptMCA0di0yaC0ydjJoMnptLTQtOHYtMmgtMnYyaDJ6bTAgNHYtMmgtMnYyaDJ6bTAgNHYtMmgtMnYyaDJ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-5"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Trusted by the Community
            </h2>
            <p className="text-lg text-gray-600">
              Join thousands of satisfied users who trust our platform for their
              buying and selling needs
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Secure Transactions",
                desc: "Protected payments and verified users",
                icon: FiShield,
                delay: 0.1,
              },
              {
                title: "Live Chat Support",
                desc: "Get help whenever you need it",
                icon: HiOutlineChatAlt2,
                delay: 0.2,
              },
              {
                title: "Easy Returns",
                desc: "Hassle-free return policy",
                icon: FiRefreshCcw,
                delay: 0.3,
              },
              {
                title: "Quality Assurance",
                desc: "All listings are verified",
                icon: FiCheck,
                delay: 0.4,
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: feature.delay }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-linear-to-r from-blue-50 to-blue-100/50 rounded-2xl transform group-hover:scale-105 transition-transform duration-500"></div>
                <div className="relative p-8 text-center">
                  <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mx-auto mb-6">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Testimonials */}
          <div className="mt-24 grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Alex Johnson",
                role: "Power Seller",
                quote:
                  "Made over $5,000 selling items I no longer needed. The platform is incredibly user-friendly!",
                avatar: "AJ",
                rating: 5,
              },
              {
                name: "Sarah Williams",
                role: "Regular Buyer",
                quote:
                  "Found amazing deals on electronics. The secure payment system gives me peace of mind.",
                avatar: "SW",
                rating: 5,
              },
              {
                name: "Mike Brown",
                role: "Verified User",
                quote:
                  "Great community of buyers and sellers. Customer support is always helpful and responsive.",
                avatar: "MB",
                rating: 5,
              },
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="flex justify-start mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <FiStar
                      key={i}
                      className="w-5 h-5 text-yellow-400 fill-yellow-400"
                    />
                  ))}
                </div>
                <p className="text-gray-600 mb-6 italic">
                  "{testimonial.quote}"
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-linear-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center text-white font-semibold">
                    {testimonial.avatar}
                  </div>
                  <div className="ml-3">
                    <div className="font-semibold text-gray-900">
                      {testimonial.name}
                    </div>
                    <div className="text-blue-600 text-sm">
                      {testimonial.role}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-linear-to-br from-blue-600 to-blue-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNGRkYiIGZpbGwtb3BhY2l0eT0iLjA1Ij48cGF0aCBkPSJNMzYgMzRoLTJ2LTJoMnYyem0wLTRoLTJ2LTJoMnYyem0wLTR2LTJoLTJ2Mmgyem0tNCAwdi0yaC0ydjJoMnptMCA0di0yaC0ydjJoMnptMCA0di0yaC0ydjJoMnptLTQtOHYtMmgtMnYyaDJ6bTAgNHYtMmgtMnYyaDJ6bTAgNHYtMmgtMnYyaDJ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-20"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="flex flex-col lg:flex-row items-center justify-between">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="lg:w-1/2 text-center lg:text-left mb-12 lg:mb-0"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Start Trading Today
              </h2>
              <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto lg:mx-0">
                Join our vibrant community of buyers and sellers. Create your
                account now and start trading with confidence.
              </p>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link
                  to="/register"
                  className="inline-flex items-center bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-blue-50 transition-all shadow-lg"
                >
                  Create Free Account
                  <FiArrowRight className="ml-2" />
                </Link>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:w-1/2 lg:pl-12"
            >
              <div className="bg-white/10 p-8 rounded-2xl backdrop-blur-sm">
                <div className="grid grid-cols-2 gap-8">
                  {[
                    { number: "50K+", label: "Active Users" },
                    { number: "100K+", label: "Items Listed" },
                    { number: "95%", label: "Satisfaction" },
                    { number: "24/7", label: "Support" },
                  ].map((stat, index) => (
                    <div key={index} className="text-center">
                      <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                        {stat.number}
                      </div>
                      <div className="text-blue-200">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-linear-to-br from-blue-600 to-purple-700 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="grid grid-cols-3 gap-8 transform -rotate-12 scale-150">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="h-64 bg-white rounded-lg"></div>
            ))}
          </div>
        </div>
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold mb-4"
          >
            Ready to Get Started?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-blue-100 mb-8 text-xl"
          >
            Join thousands of happy users today and start buying and selling
            with confidence.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <Link
              to="/register"
              className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-all hover:scale-105 inline-flex items-center"
            >
              Sign Up Free
              <FiArrowRight className="ml-2" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
