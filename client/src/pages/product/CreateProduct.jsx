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
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-gray-100 flex items-center justify-center px-4 py-8">
      <div className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl p-6 md:p-10 transition-all duration-300 hover:shadow-3xl">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-extrabold text-gray-800">
            🛒 Create New Product
          </h2>
          <p className="text-gray-500 mt-2 text-sm sm:text-base">
            Fill in the details below to list your product for sale.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
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
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-gray-700 mb-2 font-medium">
              Description
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={4}
              placeholder="Describe your product in detail"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none transition-all"
            />
          </div>

          {/* Category & Price */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
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
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                required
              />
            </div>
          </div>

          {/* Location */}
          <div>
            <label className="block text-gray-700 mb-2 font-medium">
              Location
            </label>
            <input
              type="text"
              name="location"
              value={form.location}
              onChange={handleChange}
              placeholder="Enter city or address"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
          </div>

          {/* Media Upload */}
          <div>
            <label className="block text-gray-700 mb-3 font-medium">
              Upload Media (Images / Videos)
            </label>
            <label className="flex flex-col items-center justify-center w-full h-18 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer bg-gray-50 hover:bg-gray-100 transition-all">
              <div className="flex flex-col items-center justify-center text-gray-600">
                <AiOutlineUpload className="w-6 h-6 mb-2 text-blue-500" />
                <p className="text-sm">Click or drag files to upload</p>
              </div>
              <input
                type="file"
                multiple
                accept="image/*,video/*"
                onChange={handleMediaChange}
                className="hidden"
              />
            </label>

            {/* Media Preview Grid */}
            {preview.length > 0 && (
              <div className="mt-4 grid grid-cols-3 sm:grid-cols-4 gap-3">
                {preview.map((item, index) => (
                  <div
                    key={index}
                    className="relative group rounded-lg overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition"
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
                      className="absolute top-1 right-1 bg-black/70 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition"
                    >
                      <AiOutlineClose className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Availability */}
          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              name="available"
              checked={form.available}
              onChange={handleChange}
              className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-400"
            />
            <label className="text-gray-700 font-medium">
              Mark as available for sale
            </label>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3.5 mt-2 font-semibold rounded-lg text-white shadow-md transition-all ${
              loading
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 hover:scale-[1.02]"
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
