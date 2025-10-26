import { useState } from "react";
import axios from "axios";
import { AiOutlineClose } from "react-icons/ai";
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

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Handle media file selection + preview generation
  const handleMediaChange = (e) => {
    const files = Array.from(e.target.files);

    const newPreviews = files.map((file) => {
      const type = file.type.startsWith("video") ? "video" : "image";
      return {
        url: URL.createObjectURL(file),
        type,
      };
    });

    setMediaFiles((prev) => [...prev, ...files]);
    setPreview((prev) => [...prev, ...newPreviews]);
  };

  // Delete specific media preview
  const handleDeleteMedia = (index) => {
    setPreview((prev) => prev.filter((_, i) => i !== index));
    setMediaFiles((prev) => prev.filter((_, i) => i !== index));
  };

  // Submit the form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const formData = new FormData();

      Object.keys(form).forEach((key) => formData.append(key, form[key]));
      mediaFiles.forEach((file) => formData.append("media", file));

      console.log(formData);

      await createProduct(formData);

      toast.success("Product add successfully!");
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
      toast.error("Failed to create product. Try again!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-center p-2 md:p-6">
      <div className="bg-white w-full max-w-2xl shadow-xl rounded-2xl p-5 md:p-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Create New Product
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Title */}
          <div>
            <label className="block text-gray-600 mb-2 font-medium">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Enter product title"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-gray-600 mb-2 font-medium">
              Description
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={4}
              placeholder="Describe your product"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>

          {/* Category and Price */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-600 mb-2 font-medium">
                Category
              </label>
              <input
                type="text"
                name="category"
                value={form.category}
                onChange={handleChange}
                placeholder="e.g. Electronics"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-gray-600 mb-2 font-medium">
                Price (₹)
              </label>
              <input
                type="number"
                name="price"
                value={form.price}
                onChange={handleChange}
                placeholder="Enter price"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                required
              />
            </div>
          </div>

          {/* Location */}
          <div>
            <label className="block text-gray-600 mb-2 font-medium">
              Location
            </label>
            <input
              type="text"
              name="location"
              value={form.location}
              onChange={handleChange}
              placeholder="Enter your city or address"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
              required
            />
          </div>

          {/* Media Upload */}
          <div>
            <label className="block text-gray-600 mb-2 font-medium">
              Upload Images or Videos
            </label>

            {/* Drag-drop style upload box */}
            <label className="flex flex-col items-center justify-center w-full h-20 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-all">
              <div className="flex flex-col items-center justify-center pt-5 pb-6 text-gray-500">
                <svg
                  className="w-7 h-7 mb-2 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 16V4m0 0L3 8m4-4l4 4M17 8v12m0 0l4-4m-4 4l-4-4"
                  />
                </svg>
                <p className="text-sm text-gray-500">
                  Click or drag files to upload
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

            {/* Media Preview Grid */}
            {preview.length > 0 && (
              <div className="mt-4 grid grid-cols-3 sm:grid-cols-4 gap-3">
                {preview.map((item, index) => (
                  <div
                    key={index}
                    className="relative group rounded-lg overflow-hidden border shadow-sm"
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
                    {/* Delete Icon */}
                    <button
                      type="button"
                      onClick={() => handleDeleteMedia(index)}
                      className="absolute top-1 right-1 bg-black/60 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition"
                    >
                      <AiOutlineClose className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Available */}
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="available"
              checked={form.available}
              onChange={handleChange}
              className="w-4 h-4 text-indigo-600 border-gray-300 rounded"
            />
            <label className="text-gray-700">Available for sale</label>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg transition-all duration-300"
          >
            {loading ? "Creating..." : "Create Product"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateProduct;
