const Button = ({ children, type = "button", className = "", ...props }) => {
  return (
    <button
      type={type}
      className={`w-full bg-indigo-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-300 focus:outline-none transition ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
