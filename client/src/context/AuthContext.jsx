import { createContext, useEffect, useState, useContext } from "react";
import { register, login, logout, currentUser } from "../api/auth";
import toast from "react-hot-toast";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const isAuthenticated = !!user;

  const fetchCurrentUser = async () => {
    try {
      const res = await currentUser();
      setUser(res?.data?.user);
      localStorage.setItem("user", JSON.stringify(res?.data?.user));
    } catch (error) {
      setUser(null);
      // toast.error("Failed to fetch current user info!");
    }
  };

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  const registerUser = async (data) => {
    setLoading(true);
    try {
      const res = await register(data);
      setUser(res?.data?.user);
      localStorage.setItem("user", JSON.stringify(res?.data?.user));
      setLoading(false);
      return { success: true };
    } catch (error) {
      setUser(null);
      setLoading(false);
    }
  };

  const loginUser = async (data) => {
    setLoading(true);
    try {
      const res = await login(data);
      console.log(res);
      localStorage.setItem("user", JSON.stringify(res?.data?.user));
      setUser(res?.data?.user);
      setLoading(false);
      return { success: true };
    } catch (error) {
      setUser(null);
      setLoading(false);
    }
  };

  const logoutUser = async () => {
    setLoading(true);
    try {
      await logout();
      localStorage.removeItem("user");
    } catch (error) {
      toast.error("Try again!");
    } finally {
      setUser(null);
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated,
        registerUser,
        loginUser,
        logoutUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("Failed to creater context!");
  }
  return context;
};
