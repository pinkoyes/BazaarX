import React, { useState } from "react";
import Input from "../../components/ui/Input";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { validateLoginField } from "../../utils/helper/validate";
import { loginSchema } from "../../utils/validations/auth.validation";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";

const Login = () => {
  const [formData, setFormData] = useState({
    contact: "",
    password: "",
  });
  const { loginUser, loading } = useAuth();
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    const errMsg = validateLoginField(name, value);
    setErrors((prev) => ({ ...prev, [name]: errMsg }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = loginSchema.safeParse(formData);

      const payload = {
        password: data.password,
        ...(data.contact.type === "email"
          ? { email: data.contact.value }
          : { phoneNumber: data.contact.value }),
      };

      const { success } = await loginUser(payload);
      if (success) navigate("/home");
      toast.success("Login successfully!");
      setFormData({
        contact: "",
        password: "",
      });
    } catch (error) {
      toast.error("Try again!");
    }
  };

  const handleGoogleAuth = () => {
    console.log("Google Auth clicked");
    // TODO: integrate Google OAuth
  };

  return (
    <div className="w-full my-2 max-w-md mx-auto">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">
        Welcome Back
      </h2>
      <p className="text-center text-gray-500 mb-6 text-sm">
        Log in to your account
      </p>

      {/* Login Form */}
      <form onSubmit={handleSubmit}>
        <Input
          name="contact"
          placeholder="Email or Phone Number"
          value={formData.contact}
          onChange={handleChange}
          error={errors.contact}
          required
        />

        <Input
          name="password"
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          error={errors.password}
          required
        />

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded-lg font-medium hover:bg-indigo-700 transition mt-2 cursor-pointer"
        >
          Login
        </button>
      </form>

      {/* Divider */}
      <div className="flex items-center my-6">
        <hr className="grow border-gray-300" />
        <span className="mx-2 text-gray-400 text-sm">or</span>
        <hr className="grow border-gray-300" />
      </div>

      {/* Google Auth Button */}
      <button
        onClick={handleGoogleAuth}
        className="w-full flex items-center justify-center gap-3 border border-gray-300 py-2 rounded-lg hover:bg-gray-100 transition cursor-pointer"
      >
        <FcGoogle size={24} />
        <span className="text-gray-700 font-medium">Continue with Google</span>
      </button>

      {/* Register Link */}
      <p className="text-center text-sm text-gray-600 mt-6">
        Don't have an account?{" "}
        <Link
          to="/auth/register"
          className="text-indigo-600 hover:underline font-medium"
        >
          Register
        </Link>
      </p>
    </div>
  );
};

export default Login;
