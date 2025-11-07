import api from "./api";

export const register = async (data) => {
  const res = await api.post("/auth/register", data);
  return res.data?.data;
};

export const login = async (data) => {
  const res = await api.post("/auth/login", data);
  return res.data?.data;
};

export const logout = async () => {
  const res = await api.post("/auth/logout");
  return res.data;
};

export const currentUser = async () => {
  const res = await api.get("/auth/me");
  return res.data?.data;
};

export const googleAuthApi = async (googleAuthToken) => {
  const res = await api.post("/auth/google", { googleAuthToken });
  return res.data?.data;
};
