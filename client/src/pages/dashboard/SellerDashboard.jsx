import { useEffect, useState } from "react";
import { FiEdit2, FiTrash2, FiEye, FiPlus, FiInbox } from "react-icons/fi";
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
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-12">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 tracking-tight">
              Seller Dashboard
            </h1>
            <p className="text-gray-500 mt-2">
              Manage your store, view incoming requests, and track your sales.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              to="/seller/requests"
              className="flex items-center gap-2 bg-purple-600 text-white px-5 py-2.5 rounded-lg hover:bg-purple-700 transition-all shadow-lg hover:shadow-xl"
            >
              <FiInbox className="text-lg" /> View Requests
            </Link>

            <Link
              to="/create-product"
              className="flex items-center gap-2 bg-indigo-600 text-white px-5 py-2.5 rounded-lg hover:bg-indigo-700 transition-all shadow-lg hover:shadow-xl"
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
            color="text-gray-800"
          />
          <MetricCard
            title="Active Listings"
            value={products.filter((p) => p.available).length}
            color="text-green-600"
          />
          <MetricCard
            title="Pending Approvals"
            value="0"
            color="text-yellow-500"
          />
          <MetricCard
            title="Categories"
            value={[...new Set(products.map((p) => p.category))].length}
            color="text-indigo-600"
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

const MetricCard = ({ title, value, color }) => (
  <div className="bg-white shadow-sm border border-gray-100 rounded-xl p-5 hover:shadow-md transition">
    <p className="text-gray-500 text-sm">{title}</p>
    <h2 className={`text-2xl font-semibold mt-2 ${color}`}>{value}</h2>
  </div>
);

const EmptyState = () => (
  <div className="text-center mt-24">
    <h2 className="text-xl font-semibold text-gray-700 mb-3">
      No products yet
    </h2>
    <p className="text-gray-500 mb-6">
      Add your first product to start selling!
    </p>
    <Link
      to="/create-product"
      className="bg-indigo-600 text-white px-6 py-2.5 rounded-lg hover:bg-indigo-700 transition shadow-md"
    >
      Add Product
    </Link>
  </div>
);

const ProductCard = ({ product, onDelete }) => (
  <div className="group bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 overflow-hidden">
    <div className="relative">
      <img
        src={
          product.media?.[0]?.url ||
          "https://via.placeholder.com/400x250?text=No+Image"
        }
        alt={product.title}
        className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
      />
      <span className="absolute top-3 right-3 bg-gray-100 text-gray-700 text-xs font-medium px-3 py-1 rounded-full border border-gray-200">
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

      <div className="flex items-center justify-between pt-2 border-t border-gray-100 mt-auto">
        <span className="text-indigo-600 font-bold text-lg">
          ₹{product.price}
        </span>
        <div className="flex items-center gap-3">
          <Link
            to={`/seller/product/${product._id}`}
            className="text-gray-600 hover:text-indigo-600"
          >
            <FiEye className="text-lg" />
          </Link>
          <Link
            to={`/edit-product/${product._id}`}
            className="text-gray-600 hover:text-green-600"
          >
            <FiEdit2 className="text-lg" />
          </Link>
          <button
            onClick={() => onDelete(product._id)}
            className="text-gray-600 hover:text-red-600"
          >
            <FiTrash2 className="text-lg" />
          </button>
        </div>
      </div>
    </div>
  </div>
);

export default SellerDashboard;
