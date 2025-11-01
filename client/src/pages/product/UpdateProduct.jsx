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
    <div className="min-h-screen bg-gray-50 py-10 px-5 md:px-12">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8 flex items-center justify-between">
        <Link
          to="/seller-dashboard"
          className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-all font-medium"
        >
          <FiArrowLeft className="text-lg" /> Back to Dashboard
        </Link>
      </div>

      {/* Main Form Container */}
      <div className="max-w-7xl mx-auto bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="flex flex-col md:flex-row">
          {/* LEFT SIDE */}
          <div className="w-full md:w-1/2 bg-linear-to-b from-gray-50 to-white p-8 md:p-10 border-b md:border-b-0 md:border-r border-gray-100">
            <h1 className="text-3xl font-bold text-gray-900 mb-3">
              Update Product
            </h1>
            <p className="text-gray-600 text-sm mb-10">
              Update your product information below. All changes will reflect
              instantly after saving.
            </p>

            {/* FORM FIELDS */}
            <div className="space-y-6">
              <div>
                <label className="text-gray-700 font-medium mb-2 block">
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  placeholder="Enter product title"
                  required
                />
              </div>

              <div>
                <label className="text-gray-700 font-medium mb-2 block">
                  Category
                </label>
                <input
                  type="text"
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  placeholder="Enter category"
                  required
                />
              </div>

              <div>
                <label className="text-gray-700 font-medium mb-2 block">
                  Price (₹)
                </label>
                <input
                  type="number"
                  name="price"
                  value={form.price}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  placeholder="Enter price in INR"
                  required
                />
              </div>

              <div>
                <label className="text-gray-700 font-medium mb-2 block">
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  value={form.location}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  placeholder="Enter location"
                  required
                />
              </div>

              <div className="flex items-center gap-3 mt-4">
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

          {/* RIGHT SIDE */}
          <div className="w-full md:w-1/2 p-8 md:p-10 bg-gray-50 flex flex-col justify-between">
            <div>
              <label className="text-gray-700 font-medium mb-2 block">
                Description
              </label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                rows="10"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none bg-white"
                placeholder="Write a detailed description..."
                required
              ></textarea>
            </div>

            {/* Save Button */}
            <div className="mt-10 flex justify-end">
              <button
                type="submit"
                disabled={loading}
                onClick={handleSubmit}
                className="flex items-center justify-center gap-2 bg-blue-600 text-white font-semibold px-8 py-3.5 rounded-xl shadow-md hover:bg-blue-700 hover:shadow-lg transition-all duration-200 disabled:opacity-60"
              >
                <FiSave className="text-lg" />{" "}
                {loading ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateProduct;
