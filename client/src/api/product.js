import api from "./api";

export const createProduct = async (data) => {
  console.log(data);
  const res = await api.post("/product/", data);
  return res.data;
};

export const fetchUserProducts = async (userId) => {
  const res = await api.get(`/product/user/${userId}`);
  return res.data;
};

export const deleteProductById = async (productId) => {
  const res = await api.delete(`/product/${productId}`);
  return res.data;
};

export const fetchProductById = async (productId) => {
  const res = await api.get(`/product/${productId}`);
  return res.data;
};

export const updateProductById = async (productId, data) => {
  const res = await api.patch(`/product/${productId}`, data);
  return res.data;
};
