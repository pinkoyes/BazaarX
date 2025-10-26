import { Link } from "react-router-dom";

const categories = [
  {
    name: "Electronics",
    img: "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
  },
  {
    name: "Furniture",
    img: "https://italica.com/cdn/shop/articles/05.png?v=1668071361",
  },
  {
    name: "Fashion",
    img: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d",
  },
  {
    name: "Vehicles",
    img: "https://images.unsplash.com/photo-1503376780353-7e6692767b70",
  },
];

const featuredProducts = [
  {
    name: "iPhone 14 Pro",
    price: "$999",
    img: "https://images.unsplash.com/photo-1631031877036-2d7f542f6a37",
  },
  {
    name: "Leather Sofa",
    price: "$499",
    img: "https://images.unsplash.com/photo-1616628180747-75d5c512f7c3",
  },
  {
    name: "Mountain Bike",
    price: "$299",
    img: "https://images.unsplash.com/photo-1508170495126-4a9ec9353b48",
  },
  {
    name: "Stylish Jacket",
    price: "$79",
    img: "https://images.unsplash.com/photo-1520975911094-123f5db1e264",
  },
];

const Home = () => {
  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-[rgba(255,255,255,0.8)] font-sans">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center py-20 px-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-fadeIn text-gray-900">
          Buy & Sell Anything You Love
        </h1>
        <p className="text-lg md:text-xl mb-6 animate-fadeIn animate-delay-200 max-w-xl text-gray-700">
          Discover amazing deals or sell your items in minutes. Safe, fast, and
          hassle-free.
        </p>

        <div className="flex justify-center gap-2 animate-fadeIn animate-delay-400 flex-wrap">
          <input
            type="text"
            placeholder="Search for products..."
            className="w-64 md:w-92 p-3 rounded-xl border border-gray-300 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
          <button className="bg-blue-600 text-white px-4 py-3 rounded-xl hover:bg-blue-700 transition font-semibold cursor-pointer">
            Search
          </button>
        </div>

        {/* <div className="mt-12 flex items-center justify-center gap-3 animate-fadeIn animate-delay-600 flex-wrap">
          <button className="bg-blue-600 text-white px-6 py-3 rounded-full text-lg hover:bg-blue-700 transition transform hover:scale-105 font-semibold shadow-lg">
            Start Selling
          </button>
          <button className="px-6 py-3 rounded-full text-lg border border-blue-300 hover:bg-blue-50 transition transform hover:scale-105 font-semibold">
            Explore
          </button>
        </div> */}
      </section>

      {/* Categories Section */}
      <section className="py-16 px-6">
        <h2 className="text-3xl font-semibold text-center mb-10 animate-fadeIn text-gray-800">
          Browse by Category
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {categories.map((cat, i) => (
            <div
              key={i}
              className="relative overflow-hidden rounded-2xl shadow hover:shadow-lg transition cursor-pointer group animate-fadeIn"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <img
                src={cat.img}
                alt={cat.name}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center text-white text-xl font-semibold">
                {cat.name}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 px-6">
        <h2 className="text-3xl font-semibold text-center mb-10 animate-fadeIn text-gray-800">
          Featured Products
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {featuredProducts.map((product, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl shadow hover:shadow-lg transition cursor-pointer group overflow-hidden transform hover:scale-105"
            >
              <img
                src={product.img}
                alt={product.name}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2 text-gray-800">
                  {product.name}
                </h3>
                <p className="text-blue-600 font-bold">{product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How it Works Section */}
      <section className="py-16 px-6">
        <h2 className="text-3xl font-semibold text-center mb-10 animate-fadeIn text-gray-800">
          How it Works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto text-center">
          <div className="p-6 bg-white rounded-2xl shadow hover:shadow-lg transition transform hover:scale-105">
            <h3 className="text-xl font-semibold mb-2">List Your Item</h3>
            <p className="text-gray-600">
              Quickly add your product with images and description.
            </p>
          </div>
          <div className="p-6 bg-white rounded-2xl shadow hover:shadow-lg transition transform hover:scale-105">
            <h3 className="text-xl font-semibold mb-2">Connect with Buyers</h3>
            <p className="text-gray-600">
              Chat safely with interested buyers and negotiate deals.
            </p>
          </div>
          <div className="p-6 bg-white rounded-2xl shadow hover:shadow-lg transition transform hover:scale-105">
            <h3 className="text-xl font-semibold mb-2">Complete the Sale</h3>
            <p className="text-gray-600">
              Finalize transactions easily and get your item sold.
            </p>
          </div>
        </div>
      </section>

      {/* Call-to-Action Banner */}
      <section className="py-16 px-6 bg-blue-100 text-blue-900 text-center rounded-lg mx-6 md:mx-32 mt-16 shadow-lg">
        <h2 className="text-3xl font-bold mb-4">Ready to Sell Your Product?</h2>
        <p className="mb-6">
          Join thousands of sellers and reach buyers instantly.
        </p>
        <Link
          to="/product/create"
          className="bg-blue-600 text-white px-6 py-3 rounded-full font-semibold hover:scale-105 transition transform shadow-lg"
        >
          List Your Product Now
        </Link>
      </section>

      {/* Floating Add Product Button */}
      <button className="fixed bottom-8 right-8 bg-blue-600 text-white p-5 rounded-full shadow-lg hover:bg-blue-700 transition transform hover:scale-110 cursor-pointer">
        ➕
      </button>
    </div>
  );
};

export default Home;
