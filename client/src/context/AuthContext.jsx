import { createContext, useEffect, useState, useContext } from "react";
import {
  register,
  login,
  logout,
  currentUser,
  googleAuthApi,
} from "../api/auth";
import toast from "react-hot-toast";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [initializing, setInitializing] = useState(true);

  const isAuthenticated = !!user;

  const fetchCurrentUser = async () => {
    try {
      setInitializing(true);
      const data = await currentUser();
      const current = data?.user || null;
      setUser(current);
      if (current) {
        localStorage.setItem("user", JSON.stringify(current));
      } else {
        localStorage.removeItem("user");
      }
    } catch (error) {
      // fallback: check if user data exists in localStorage
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser));
        } catch {
          localStorage.removeItem("user");
          setUser(null);
        }
      } else {
        setUser(null);
      }
    } finally {
      setInitializing(false);
    }
  };

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  const registerUser = async (registerPayload) => {
    setLoading(true);
    try {
      const data = await register(registerPayload);
      const newUser = data?.user;
      setUser(newUser);
      localStorage.setItem("user", JSON.stringify(newUser));
      toast.success("Registration successful!");
      return { success: true };
    } catch (error) {
      toast.error(error?.response?.data?.message || "Registration failed!");
      setUser(null);
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  const loginUser = async (loginPayload) => {
    setLoading(true);
    try {
      const data = await login(loginPayload);
      const loggedInUser = data?.user;
      setUser(loggedInUser);
      localStorage.setItem("user", JSON.stringify(loggedInUser));
      return { success: true };
    } catch (error) {
      toast.error(error?.response?.data?.message || "Login failed!");
      setUser(null);
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  const logoutUser = async () => {
    setLoading(true);
    try {
      await logout();
      localStorage.removeItem("user");
      setUser(null);
      toast.success("Logged out successfully!");
    } catch (error) {
      toast.error("Failed to logout. Try again!");
    } finally {
      setLoading(false);
    }
  };

  const googleLoginUser = async (token) => {
    setLoading(true);
    try {
      const data = await googleAuthApi(token);
      const googleUser = data?.user;
      setUser(googleUser);
      localStorage.setItem("user", JSON.stringify(googleUser));
      toast.success("Google login successful!");
      return { success: true };
    } catch (error) {
      toast.error("Google login failed!");
      setUser(null);
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        initializing,
        isAuthenticated,
        registerUser,
        loginUser,
        logoutUser,
        googleLoginUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
