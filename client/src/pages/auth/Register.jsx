import React, { useState } from "react";
import Input from "../../components/ui/Input";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";
import { validateRegisterField } from "../../utils/helper/validate";
import { registerSchema } from "../../utils/validations/auth.validation";
import { z } from "zod";

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    contact: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    const errMsg = validateRegisterField(name, value);
    setErrors((prev) => ({ ...prev, [name]: errMsg }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    try {
      const { data } = registerSchema.safeParse(formData);

      const isEmail = z.email().safeParse(data.contact).success;

      const payload = {
        fullName: data.fullName,
        password: data.password,
        ...(isEmail ? { email: data.contact } : { phoneNumber: data.contact }),
      };

      console.log("Payload to send:", payload);
    } catch (err) {
      console.log("error");
    }
  };

  const handleGoogleAuth = () => {
    console.log("Google Auth clicked");
    // TODO: integrate Google OAuth
  };

  return (
    <div className="w-full my-2 max-w-md mx-auto">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Create Your Account
      </h2>

      {/* Registration Form */}
      <form onSubmit={handleSubmit}>
        <Input
          name="fullName"
          placeholder="John Doe"
          value={formData.fullName}
          onChange={handleChange}
          error={errors.fullName}
          required
        />

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
          Register
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
        className="w-full flex items-center cursor-pointer justify-center gap-3 border border-gray-300 py-2 rounded-lg hover:bg-gray-100 transition"
      >
        <FcGoogle size={24} />
        <span className="text-gray-700 font-medium">Continue with Google</span>
      </button>

      {/* Login Link */}
      <p className="text-center text-sm text-gray-600 mt-6">
        Already have an account?{" "}
        <Link
          to="/auth/login"
          className="text-indigo-600 hover:underline font-medium"
        >
          Login
        </Link>
      </p>
    </div>
  );
};

export default Register;
