import { useState } from "react";
import { AiOutlineClose, AiOutlineUpload } from "react-icons/ai";
import toast from "react-hot-toast";
import { createProduct } from "../../api/product";

const CreateProduct = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    price: "",
    location: "",
    available: true,
  });

  const [mediaFiles, setMediaFiles] = useState([]);
  const [preview, setPreview] = useState([]);
  const [loading, setLoading] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Handle media uploads
  const handleMediaChange = (e) => {
    const files = Array.from(e.target.files);
    const newPreviews = files.map((file) => ({
      url: URL.createObjectURL(file),
      type: file.type.startsWith("video") ? "video" : "image",
    }));
    setMediaFiles((prev) => [...prev, ...files]);
    setPreview((prev) => [...prev, ...newPreviews]);
  };

  const handleDeleteMedia = (index) => {
    setPreview((prev) => prev.filter((_, i) => i !== index));
    setMediaFiles((prev) => prev.filter((_, i) => i !== index));
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const formData = new FormData();
      Object.keys(form).forEach((key) => formData.append(key, form[key]));
      mediaFiles.forEach((file) => formData.append("media", file));

      await createProduct(formData);
      toast.success("✅ Product added successfully!");

      setForm({
        title: "",
        description: "",
        category: "",
        price: "",
        location: "",
        available: true,
      });
      setMediaFiles([]);
      setPreview([]);
    } catch (error) {
      console.error(error);
      toast.error("❌ Failed to create product. Try again!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-50 via-white to-blue-50 flex items-center justify-center px-4 py-10">
      <div className="bg-white/90 backdrop-blur-lg w-full max-w-4xl rounded-3xl shadow-xl p-8 md:p-12 transition-all duration-300 hover:shadow-2xl border border-gray-100">
        {/* ===== Header ===== */}
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold text-gray-900">
            🛍️ Create New Product
          </h2>
          <p className="text-gray-500 mt-2 text-sm md:text-base max-w-md mx-auto">
            Fill in the details below to list your product on the marketplace.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* === Title === */}
          <div>
            <label className="block text-gray-700 mb-2 font-medium">
              Product Title
            </label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Enter a catchy product name"
              className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all bg-white/80"
              required
            />
          </div>

          {/* === Description === */}
          <div>
            <label className="block text-gray-700 mb-2 font-medium">
              Description
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={4}
              placeholder="Describe your product in detail..."
              className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none resize-none transition-all bg-white/80"
            />
          </div>

          {/* === Category & Price === */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-gray-700 mb-2 font-medium">
                Category
              </label>
              <input
                type="text"
                name="category"
                value={form.category}
                onChange={handleChange}
                placeholder="e.g. Electronics, Furniture"
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none bg-white/80"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2 font-medium">
                Price (₹)
              </label>
              <input
                type="number"
                name="price"
                value={form.price}
                onChange={handleChange}
                placeholder="Enter product price"
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none bg-white/80"
                required
              />
            </div>
          </div>

          {/* === Location === */}
          <div>
            <label className="block text-gray-700 mb-2 font-medium">
              Location
            </label>
            <input
              type="text"
              name="location"
              value={form.location}
              onChange={handleChange}
              placeholder="Enter city or full address"
              className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none bg-white/80"
              required
            />
          </div>

          {/* === Media Upload === */}
          <div>
            <label className="block text-gray-700 mb-3 font-medium">
              Upload Media (Images / Videos)
            </label>

            <label className="flex flex-col items-center justify-center w-full h-22 border-2 border-dashed border-gray-300 rounded-2xl cursor-pointer bg-gray-50 hover:bg-indigo-50 transition-all group">
              <div className="flex flex-col items-center justify-center text-gray-600">
                <AiOutlineUpload className="w-6 h-6 mb-2 text-indigo-500 group-hover:scale-110 transition" />
                <p className="text-sm">
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop files
                </p>
              </div>
              <input
                type="file"
                multiple
                accept="image/*,video/*"
                onChange={handleMediaChange}
                className="hidden"
              />
            </label>

            {/* Preview Section */}
            {preview.length > 0 && (
              <div className="mt-5 grid grid-cols-3 sm:grid-cols-4 gap-3">
                {preview.map((item, index) => (
                  <div
                    key={index}
                    className="relative group rounded-xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-all"
                  >
                    {item.type === "image" ? (
                      <img
                        src={item.url}
                        alt="preview"
                        className="w-full h-28 object-cover"
                      />
                    ) : (
                      <video
                        src={item.url}
                        controls
                        className="w-full h-28 object-cover"
                      />
                    )}

                    {/* Delete Button */}
                    <button
                      type="button"
                      onClick={() => handleDeleteMedia(index)}
                      className="absolute top-2 right-2 bg-black/70 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition"
                    >
                      <AiOutlineClose className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* === Availability === */}
          <div className="flex items-center gap-3 mt-2">
            <input
              type="checkbox"
              name="available"
              checked={form.available}
              onChange={handleChange}
              className="w-5 h-5 text-indigo-600 border-gray-300 rounded focus:ring-2 focus:ring-indigo-500"
            />
            <label className="text-gray-700 font-medium">
              Mark as available for sale
            </label>
          </div>

          {/* === Submit Button === */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3.5 mt-3 font-semibold rounded-xl text-white shadow-md transition-all ${
              loading
                ? "bg-indigo-400 cursor-not-allowed"
                : "bg-linear-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 hover:scale-[1.02]"
            }`}
          >
            {loading ? "Creating Product..." : "Create Product"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateProduct;
