import { useEffect, useState } from "react";
import { FiEdit2, FiTrash2, FiEye, FiPlus } from "react-icons/fi";
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
      const res = await fetchUserProducts(user?._id);
      setProducts(res.data);
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
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (!confirmDelete) return;

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
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-14">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
            Seller Dashboard
          </h1>
          <Link
            to="/create-product"
            className="flex items-center gap-2 bg-blue-600 text-white px-2 py-2 md:px-4 md:py-2 rounded-lg hover:bg-blue-700 transition"
          >
            <FiPlus /> Add Product
          </Link>
        </div>

        {products.length === 0 ? (
          <div className="text-center mt-20 text-gray-600">
            <p>No products found!</p>
            <Link
              to="/create-product"
              className="mt-4 inline-block text-blue-600 hover:underline"
            >
              Add your first product
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <div
                key={product._id}
                className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300"
              >
                <img
                  src={product.media?.[0]?.url}
                  alt={product.title}
                  className="w-full h-56 object-cover"
                />

                <div className="p-4">
                  <h2 className="text-lg font-semibold text-gray-800 truncate">
                    {product.title}
                  </h2>
                  <p className="text-gray-500 text-sm line-clamp-2 mb-2">
                    {product.description}
                  </p>

                  <div className="flex justify-between items-center mb-3">
                    <span className="text-gray-700 font-medium">
                      ₹{product.price}
                    </span>
                    <span className="text-sm bg-gray-100 text-gray-600 px-2 py-1 rounded-md">
                      {product.category}
                    </span>
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    <Link
                      to={`/product/${product._id}`}
                      className="flex items-center gap-1 text-blue-600 hover:text-blue-800 transition"
                    >
                      <FiEye /> View
                    </Link>

                    <Link
                      to={`/edit-product/${product._id}`}
                      className="flex items-center gap-1 text-green-600 hover:text-green-800 transition"
                    >
                      <FiEdit2 /> Edit
                    </Link>

                    <button
                      onClick={() => handleDelete(product._id)}
                      className="flex items-center gap-1 text-red-600 hover:text-red-800 transition"
                    >
                      <FiTrash2 /> Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SellerDashboard;
