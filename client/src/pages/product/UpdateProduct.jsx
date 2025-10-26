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
      const res = await fetchProductById(id);
      setForm({
        title: res.data.title,
        description: res.data.description,
        category: res.data.category,
        price: res.data.price,
        location: res.data.location,
        available: res.data.available,
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
      <div className="flex justify-center items-center h-screen text-lg font-medium">
        Loading product details...
      </div>
    );

  return (
    <div className="max-w-7xl my-6 mx-auto px-6 py-10">
      {/* Back to Dashboard */}
      <div className="flex justify-between items-center mb-8">
        <Link
          to="/seller-dashboard"
          className="flex items-center gap-2 mb-2 text-blue-600 hover:text-blue-800 transition-all font-medium"
        >
          <FiArrowLeft /> Back to Dashboard
        </Link>
      </div>

      {/* Form Container */}
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-10 p-8"
        >
          {/* LEFT SECTION */}
          <div className="flex flex-col justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Update Product
              </h1>
              <p className="text-gray-600 text-base mb-8">
                Make changes to your product details below and click save to
                update them instantly.
              </p>

              {/* Title */}
              <div className="mb-5">
                <label className="font-medium text-gray-700 mb-2 block">
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  placeholder="Enter product title"
                  required
                />
              </div>

              {/* Category */}
              <div className="mb-5">
                <label className="font-medium text-gray-700 mb-2 block">
                  Category
                </label>
                <input
                  type="text"
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  placeholder="Enter category"
                  required
                />
              </div>

              {/* Price */}
              <div className="mb-5">
                <label className="font-medium text-gray-700 mb-2 block">
                  Price (₹)
                </label>
                <input
                  type="number"
                  name="price"
                  value={form.price}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  placeholder="Enter price"
                  required
                />
              </div>

              {/* Location */}
              <div className="mb-5">
                <label className="font-medium text-gray-700 mb-2 block">
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  value={form.location}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  placeholder="Enter location"
                  required
                />
              </div>

              {/* Availability */}
              <div className="flex items-center gap-3 mt-3">
                <input
                  type="checkbox"
                  name="available"
                  checked={form.available}
                  onChange={handleChange}
                  className="w-5 h-5 accent-blue-600 cursor-pointer"
                />
                <label className="text-gray-700 font-medium">
                  Available for Sale
                </label>
              </div>
            </div>
          </div>

          {/* RIGHT SECTION */}
          <div className="flex flex-col justify-between">
            <div>
              <label className="font-medium text-gray-700 mb-2 block">
                Description
              </label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                rows="8"
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none"
                placeholder="Write a short description..."
                required
              ></textarea>
            </div>

            {/* Save Button */}
            <div className="mt-8 flex justify-end">
              <button
                type="submit"
                disabled={loading}
                className="flex items-center justify-center gap-2 bg-blue-600 text-white font-semibold px-8 py-3 rounded-lg shadow-md hover:bg-blue-700 transition-all duration-200 disabled:opacity-60"
              >
                <FiSave /> {loading ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProduct;
