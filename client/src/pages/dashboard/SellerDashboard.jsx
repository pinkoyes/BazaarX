import { useEffect, useState } from "react";
import {
  FiEdit2,
  FiTrash2,
  FiEye,
  FiPlus,
  FiInbox,
  FiBox,
  FiTag,
} from "react-icons/fi";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { fetchUserProducts, deleteProductById } from "../../api/product";
import { useAuth } from "../../context/AuthContext";

const SellerDashboard = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const fetchProductsData = async () => {
    setLoading(true);
    try {
      const data = await fetchUserProducts(user?._id);
      setProducts(data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch your products!");
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?._id) fetchProductsData();
  }, [user]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?"))
      return;
    try {
      await deleteProductById(id);
      toast.success("Product deleted successfully!");
      setProducts(products.filter((p) => p._id !== id));
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete product!");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 via-white to-gray-100 py-12 px-6 md:px-14">
      <div className="max-w-7xl mx-auto">
        {/* === HEADER === */}
        <div className="bg-linear-to-r from-indigo-600 to-blue-600 rounded-3xl shadow-xl text-white p-8 md:p-10 mb-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Seller Dashboard
            </h1>
            <p className="text-indigo-100 mt-2 max-w-lg">
              Manage your store, monitor listings, and track sales performance
              all in one place.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/seller/requests"
              className="flex items-center gap-2 bg-white/15 text-white px-5 py-2.5 rounded-lg backdrop-blur-md hover:bg-white/25 transition-all shadow-md hover:shadow-lg"
            >
              <FiInbox className="text-lg" /> View Requests
            </Link>

            <Link
              to="/create-product"
              className="flex items-center gap-2 bg-yellow-400 text-gray-900 px-5 py-2.5 rounded-lg font-medium hover:bg-yellow-300 transition-all shadow-md hover:shadow-lg"
            >
              <FiPlus className="text-lg" /> Add Product
            </Link>
          </div>
        </div>

        {/* === METRICS === */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <MetricCard
            title="Total Products"
            value={products.length}
            icon={<FiBox className="text-indigo-600 text-2xl" />}
            accent="from-indigo-500/10 to-indigo-500/5"
          />
          <MetricCard
            title="Active Listings"
            value={products.filter((p) => p.available).length}
            icon={<FiTag className="text-green-600 text-2xl" />}
            accent="from-green-500/10 to-green-500/5"
          />
          <MetricCard
            title="Pending Approvals"
            value="0"
            icon={<FiInbox className="text-yellow-500 text-2xl" />}
            accent="from-yellow-400/10 to-yellow-400/5"
          />
          <MetricCard
            title="Categories"
            value={[...new Set(products.map((p) => p.category))].length}
            icon={<FiEdit2 className="text-purple-600 text-2xl" />}
            accent="from-purple-500/10 to-purple-500/5"
          />
        </div>

        {/* === PRODUCTS === */}
        {products.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// === Reusable UI Components ===

const MetricCard = ({ title, value, icon, accent }) => (
  <div
    className={`bg-linear-to-br ${accent} shadow-sm border border-gray-100 rounded-2xl p-6 hover:shadow-lg transition-all duration-300`}
  >
    <div className="flex items-center justify-between">
      <div>
        <p className="text-gray-600 text-sm font-medium">{title}</p>
        <h2 className="text-3xl font-semibold text-gray-800 mt-2">{value}</h2>
      </div>
      <div className="p-3 bg-white shadow-inner rounded-xl">{icon}</div>
    </div>
  </div>
);

const EmptyState = () => (
  <div className="text-center mt-28">
    <h2 className="text-2xl font-semibold text-gray-800 mb-3">
      No products yet 😔
    </h2>
    <p className="text-gray-500 mb-6">
      Add your first product to start your selling journey!
    </p>
    <Link
      to="/create-product"
      className="bg-indigo-600 text-white px-6 py-2.5 rounded-lg hover:bg-indigo-700 transition shadow-md hover:shadow-xl"
    >
      Add Product
    </Link>
  </div>
);

const ProductCard = ({ product, onDelete }) => (
  <div className="group bg-white/90 backdrop-blur-md rounded-2xl shadow-md border border-gray-100 hover:shadow-2xl transition-all duration-300 overflow-hidden">
    <div className="relative">
      <img
        src={
          product.media?.[0]?.url ||
          "https://via.placeholder.com/400x250?text=No+Image"
        }
        alt={product.title}
        className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
      />
      <span className="absolute top-3 right-3 bg-white/80 text-gray-700 text-xs font-medium px-3 py-1 rounded-full shadow-sm">
        {product.category}
      </span>
    </div>

    <div className="p-5 flex flex-col gap-3">
      <div>
        <h2 className="text-lg font-semibold text-gray-800 truncate mb-1">
          {product.title}
        </h2>
        <p className="text-gray-500 text-sm line-clamp-2">
          {product.description || "No description provided."}
        </p>
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-gray-100 mt-auto">
        <span className="text-indigo-600 font-bold text-lg">
          ₹{product.price}
        </span>
        <div className="flex items-center gap-4">
          <Link
            to={`/seller/product/${product._id}`}
            className="text-gray-500 hover:text-indigo-600 transition"
          >
            <FiEye className="text-lg" />
          </Link>
          <Link
            to={`/edit-product/${product._id}`}
            className="text-gray-500 hover:text-green-600 transition"
          >
            <FiEdit2 className="text-lg" />
          </Link>
          <button
            onClick={() => onDelete(product._id)}
            className="text-gray-500 hover:text-red-600 transition"
          >
            <FiTrash2 className="text-lg" />
          </button>
        </div>
      </div>
    </div>
  </div>
);

export default SellerDashboard;
