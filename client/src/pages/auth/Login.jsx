import React, { useState } from "react";
import Input from "../../components/ui/Input";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    emailOrPhone: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.emailOrPhone.trim())
      newErrors.emailOrPhone = "Email or Phone number is required";
    if (!formData.password.trim()) newErrors.password = "Password is required";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    console.log("Login data:", formData);
    // TODO: integrate backend login API
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
          name="emailOrPhone"
          placeholder="Email or Phone Number"
          value={formData.emailOrPhone}
          onChange={handleChange}
          error={errors.emailOrPhone}
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
