import api from "./api";

export const createProduct = async (data) => {
  const res = await api.post("/product/", data);
  return res.data;
};

export const fetchUserProducts = async (userId) => {
  const res = await api.get(`/product/user/${userId}`);
  return res.data?.data;
};

export const deleteProductById = async (productId) => {
  const res = await api.delete(`/product/${productId}`);
  return res.data;
};

export const fetchProductById = async (productId) => {
  const res = await api.get(`/product/${productId}`);
  return res.data?.data;
};

export const updateProductById = async (productId, data) => {
  const res = await api.patch(`/product/${productId}`, data);
  return res.data;
};

export const fetchProductsForHomePage = async () => {
  const res = await api.get("/product/home");
  return res.data?.data;
};

export const fetchProductByCategory = async (category) => {
  const res = await api.get(`/product/category?category=${category}`);
  return res.data?.data;
};

export const fetchAllCategories = async () => {
  const res = await api.get("/product/categories");
  return res.data?.data;
};

export const initiateChatWithOwner = async () => {
  console.log("chat with owner!...");
};
