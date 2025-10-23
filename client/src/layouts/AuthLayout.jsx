import { Outlet, Link } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-linear-to-br from-indigo-50 via-blue-50 to-purple-50">
      {/* Card wrapper */}
      <div className="w-full max-w-md bg-white shadow-xl rounded-xl p-6">
        <Outlet />
      </div>

      {/* Go Home link */}
      <Link
        to="/"
        className="mt-6 inline-block text-indigo-600 hover:text-indigo-800 font-medium transition"
      >
        ← Go to Home
      </Link>
    </div>
  );
};

export default AuthLayout;
