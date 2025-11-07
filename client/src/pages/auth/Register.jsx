import React, { useState } from "react";
import Input from "../../components/ui/Input";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { validateRegisterField } from "../../utils/helper/validate";
import { registerSchema } from "../../utils/validations/auth.validation";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    contact: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const { registerUser, loading, googleLoginUser } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    const errMsg = validateRegisterField(name, value);
    setErrors((prev) => ({ ...prev, [name]: errMsg }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = registerSchema.safeParse(formData);
    if (!result.success) {
      const newErrors = {};
      result.error.issues.forEach((issue) => {
        newErrors[issue.path[0]] = issue.message;
      });
      setErrors(newErrors);
      toast.error("Please correct the errors");
      return;
    }

    const { data } = result;

    const payload = {
      fullName: data.fullName,
      password: data.password,
      ...(data.contact.type === "email"
        ? { email: data.contact.value }
        : { phoneNumber: data.contact.value }),
    };

    try {
      const res = await registerUser(payload);
      toast.success("Registration successful!");
      navigate("/home");
    } catch (err) {
      console.error("Registration error:", err);
      toast.error(err?.response?.data?.message || "Registration failed");
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const token = credentialResponse.credential;
      await googleLoginUser(token);
      toast.success("Google login successful!");
      navigate("/home");
    } catch (error) {
      console.error("Google login failed:", error);
      toast.error("Google login failed");
    }
  };

  return (
    <div className="w-full my-2 max-w-md mx-auto">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Create Your Account
      </h2>

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
          disabled={loading}
          className="w-full bg-indigo-600 text-white py-2 rounded-lg font-medium hover:bg-indigo-700 transition mt-2 cursor-pointer disabled:opacity-60"
        >
          {loading ? "Registering..." : "Register"}
        </button>
      </form>

      <div className="flex items-center my-6">
        <hr className="grow border-gray-300" />
        <span className="mx-2 text-gray-400 text-sm">or</span>
        <hr className="grow border-gray-300" />
      </div>

      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
        <div className="flex justify-center">
          <div className="w-full">
            <button
              type="button"
              onClick={(e) => e.preventDefault()}
              className="w-full flex items-center justify-center gap-3 border border-gray-300 py-2.5 rounded-lg hover:bg-gray-50 active:scale-[0.98] transition-all duration-150 shadow-sm"
            >
              <FcGoogle size={22} />
              <span className="text-gray-700 font-medium">
                Continue with Google
              </span>
            </button>

            <div className="relative -mt-11 opacity-0 pointer-events-auto">
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={() => toast.error("Google Login Failed")}
                useOneTap={false}
              />
            </div>
          </div>
        </div>
      </GoogleOAuthProvider>

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
