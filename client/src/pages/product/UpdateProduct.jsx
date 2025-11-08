import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { fetchProductById, updateProductById } from "../../api/product";
import toast from "react-hot-toast";
import { FiArrowLeft, FiSave } from "react-icons/fi";

const UpdateProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    price: "",
    location: "",
    available: true,
  });

  const [loading, setLoading] = useState(true);

  const getProduct = async () => {
    setLoading(true);
    try {
      const data = await fetchProductById(id);
      setForm({
        title: data.title,
        description: data.description,
        category: data.category,
        price: data.price,
        location: data.location,
        available: data.available,
      });
    } catch (err) {
      console.error(err);
      toast.error("Failed to load product data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) getProduct();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await updateProductById(id, form);
      toast.success("✅ Product updated successfully!");
      navigate("/seller-dashboard");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update product");
    } finally {
      setLoading(false);
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen text-lg font-medium text-gray-600">
        Loading product details...
      </div>
    );

  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-50 via-white to-blue-50 py-10 px-4 sm:px-8 lg:px-16">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <Link
          to="/seller-dashboard"
          className="flex items-center gap-2 text-indigo-600 hover:text-indigo-800 transition-all font-semibold text-sm"
        >
          <FiArrowLeft className="text-lg" /> Back to Dashboard
        </Link>

        <h1 className="text-3xl font-bold text-gray-900">
          ✏️ Edit Product Details
        </h1>
      </div>

      {/* Main Card */}
      <div className="max-w-7xl mx-auto bg-white/90 backdrop-blur-lg rounded-3xl shadow-xl border border-gray-100 overflow-hidden transition-all hover:shadow-2xl">
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 lg:grid-cols-2"
        >
          {/* LEFT PANEL */}
          <div className="w-full p-8 sm:p-10 border-b lg:border-b-0 lg:border-r border-gray-100 bg-linear-to-b from-white to-gray-50">
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              Product Info
            </h2>
            <p className="text-gray-600 text-sm mb-8">
              Update key details like name, price, and category.
            </p>

            <div className="space-y-6">
              {/* Title */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Product Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none bg-white/80"
                  placeholder="Enter product name"
                  required
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Category
                </label>
                <input
                  type="text"
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none bg-white/80"
                  placeholder="Enter category name"
                  required
                />
              </div>

              {/* Price */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Price (₹)
                </label>
                <input
                  type="number"
                  name="price"
                  value={form.price}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none bg-white/80"
                  placeholder="Enter product price"
                  required
                />
              </div>

              {/* Location */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  value={form.location}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none bg-white/80"
                  placeholder="Enter product location"
                  required
                />
              </div>

              {/* Availability */}
              <div className="flex items-center gap-3 mt-4">
                <input
                  type="checkbox"
                  name="available"
                  checked={form.available}
                  onChange={handleChange}
                  className="w-5 h-5 accent-indigo-600 cursor-pointer"
                />
                <label className="text-gray-700 font-medium">
                  Available for Sale
                </label>
              </div>
            </div>
          </div>

          {/* RIGHT PANEL */}
          <div className="w-full p-8 sm:p-10 bg-linear-to-b from-gray-50 to-white flex flex-col justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                Description
              </h2>
              <p className="text-gray-600 text-sm mb-6">
                Provide an engaging, accurate product description.
              </p>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                rows="10"
                className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-indigo-500 outline-none resize-none bg-white/80"
                placeholder="Write a detailed description..."
                required
              ></textarea>
            </div>

            {/* Save Button */}
            <div className="mt-8 flex justify-end">
              <button
                type="submit"
                disabled={loading}
                className="flex items-center justify-center gap-2 bg-linear-to-r from-indigo-600 to-blue-600 text-white font-semibold px-8 py-3.5 rounded-xl shadow-md hover:from-indigo-700 hover:to-blue-700 hover:shadow-lg transition-all duration-200 disabled:opacity-60"
              >
                <FiSave className="text-lg" />
                {loading ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProduct;
