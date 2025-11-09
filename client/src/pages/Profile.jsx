import React, { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchUserInfo, updateUserInfo, deleteUser } from "../api/user";
import { FiEdit2, FiSave, FiX, FiUpload, FiTrash2 } from "react-icons/fi";
import toast from "react-hot-toast";

const Profile = () => {
  const queryClient = useQueryClient();
  const [isEditing, setIsEditing] = useState(false);
  const [preview, setPreview] = useState(null);
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    password: "",
    profileImage: null,
  });

  // ✅ Fetch user
  const { data: user, isLoading } = useQuery({
    queryKey: ["userInfo"],
    queryFn: fetchUserInfo,
  });

  // ✅ Fill form when user data changes
  useEffect(() => {
    if (user) {
      setForm({
        fullName: user.fullName || "",
        email: user.email || "",
        phoneNumber: user.phoneNumber || "",
        password: "",
        profileImage: null,
      });
    }
  }, [user]);

  const { mutate: updateProfile, isPending: updating } = useMutation({
    mutationFn: updateUserInfo,
    onSuccess: () => {
      toast.success("Profile updated!");
      queryClient.invalidateQueries({ queryKey: ["userInfo"] });
      setIsEditing(false);
      setPreview(null);
    },
    onError: (err) => toast.error(err.message),
  });

  const { mutate: deleteAccount, isPending: deleting } = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      toast.success("Account deleted");
      localStorage.clear();
      window.location.href = "/";
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const fd = new FormData();
    Object.entries(form).forEach(([k, v]) => v && fd.append(k, v));
    updateProfile(fd);
  };

  if (isLoading)
    return (
      <div className="min-h-screen flex justify-center items-center text-blue-700 font-medium">
        Loading profile...
      </div>
    );

  return (
    <div className="min-h-screen bg-blue-50 flex justify-center py-12 px-4">
      <div className="max-w-3xl w-full bg-white rounded-2xl shadow-md border border-blue-100 p-8">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-blue-100 pb-5 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-blue-800">Profile</h1>
            <p className="text-sm text-gray-500">
              View or edit your personal details.
            </p>
          </div>

          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition cursor-pointer"
            >
              <FiEdit2 /> Edit
            </button>
          ) : (
            <div className="flex gap-3">
              <button
                form="profileForm"
                type="submit"
                disabled={updating}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition cursor-pointer disabled:opacity-60"
              >
                <FiSave /> {updating ? "Saving..." : "Save"}
              </button>
              <button
                onClick={() => {
                  setIsEditing(false);
                  setPreview(null);
                  setForm({
                    fullName: user.fullName,
                    email: user.email,
                    phoneNumber: user.phoneNumber,
                    password: "",
                    profileImage: null,
                  });
                }}
                className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition cursor-pointer"
              >
                <FiX /> Cancel
              </button>
            </div>
          )}
        </div>

        {/* Form */}
        <form
          id="profileForm"
          onSubmit={handleSubmit}
          className="grid md:grid-cols-[220px,1fr] gap-10"
        >
          {/* Avatar */}
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <img
                src={preview || user?.profileImage || "/default-avatar.png"}
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover border-4 border-blue-100 shadow-sm"
              />
              {isEditing && (
                <label className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full cursor-pointer hover:bg-blue-700 transition">
                  <FiUpload />
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        setForm((f) => ({ ...f, profileImage: file }));
                        setPreview(URL.createObjectURL(file));
                      }
                    }}
                  />
                </label>
              )}
            </div>
            <h3 className="text-blue-800 font-semibold text-lg">
              {form.fullName}
            </h3>
            <p className="text-gray-500 text-sm">{form.email}</p>

            <button
              type="button"
              onClick={() => !deleting && deleteAccount()}
              disabled={deleting}
              className="mt-4 flex items-center gap-2 text-sm text-red-600 hover:text-red-700 cursor-pointer"
            >
              <FiTrash2 /> {deleting ? "Deleting..." : "Delete Account"}
            </button>
          </div>

          {/* Fields */}
          <div className="space-y-6">
            {/* Full Name */}
            <div>
              <label className="text-sm text-gray-600 font-medium">
                Full Name
              </label>
              <input
                type="text"
                value={form.fullName}
                onChange={(e) =>
                  setForm((f) => ({ ...f, fullName: e.target.value }))
                }
                disabled={!isEditing}
                className={`w-full mt-1 border rounded-lg p-2.5 text-gray-800 focus:ring-2 focus:ring-blue-200 ${
                  isEditing
                    ? "border-blue-300 bg-white cursor-text"
                    : "border-gray-200 bg-gray-50 cursor-not-allowed"
                }`}
              />
            </div>

            {/* Email */}
            <div>
              <label className="text-sm text-gray-600 font-medium">Email</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) =>
                  setForm((f) => ({ ...f, email: e.target.value }))
                }
                disabled={!isEditing}
                className={`w-full mt-1 border rounded-lg p-2.5 text-gray-800 focus:ring-2 focus:ring-blue-200 ${
                  isEditing
                    ? "border-blue-300 bg-white cursor-text"
                    : "border-gray-200 bg-gray-50 cursor-not-allowed"
                }`}
              />
            </div>

            {/* Phone */}
            <div>
              <label className="text-sm text-gray-600 font-medium">
                Phone Number
              </label>
              <input
                type="text"
                value={form.phoneNumber}
                onChange={(e) =>
                  setForm((f) => ({ ...f, phoneNumber: e.target.value }))
                }
                disabled={!isEditing}
                className={`w-full mt-1 border rounded-lg p-2.5 text-gray-800 focus:ring-2 focus:ring-blue-200 ${
                  isEditing
                    ? "border-blue-300 bg-white cursor-text"
                    : "border-gray-200 bg-gray-50 cursor-not-allowed"
                }`}
              />
            </div>

            {/* Password */}
            <div>
              <label className="text-sm text-gray-600 font-medium">
                New Password
              </label>
              <input
                type="password"
                value={form.password}
                placeholder="Enter new password"
                onChange={(e) =>
                  setForm((f) => ({ ...f, password: e.target.value }))
                }
                disabled={!isEditing}
                className={`w-full mt-1 border rounded-lg p-2.5 text-gray-800 focus:ring-2 focus:ring-blue-200 ${
                  isEditing
                    ? "border-blue-300 bg-white cursor-text"
                    : "border-gray-200 bg-gray-50 cursor-not-allowed"
                }`}
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
