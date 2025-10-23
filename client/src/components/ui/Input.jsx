import { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

const Input = ({
  label,
  type = "text",
  name,
  value,
  onChange,
  placeholder = "",
  error,
  required = false,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => setShowPassword((prev) => !prev);

  const inputType =
    type === "password" ? (showPassword ? "text" : "password") : type;

  return (
    <div className="mb-4 relative">
      {label && (
        <label
          htmlFor={name}
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {label}
          {required && <span className="text-red-500">*</span>}
        </label>
      )}

      <input
        id={name}
        name={name}
        type={inputType}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className={`w-full px-3 py-2.5 border rounded-lg focus:border-none focus:outline-none focus:ring-2 transition placeholder-gray-400 ${
          error
            ? "border-red-500 focus:ring-red-300"
            : "border-gray-300 focus:ring-indigo-500"
        }`}
        {...props}
      />

      {/* Show/hide password icon */}
      {type === "password" && (
        <span
          onClick={toggleShowPassword}
          className={`absolute right-3 ${
            error && "top-6"
          } top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer`}
        >
          {showPassword ? (
            <AiFillEyeInvisible size={20} />
          ) : (
            <AiFillEye size={20} />
          )}
        </span>
      )}

      {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
    </div>
  );
};

export default Input;
