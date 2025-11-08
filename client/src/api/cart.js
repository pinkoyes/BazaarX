import api from "./api";

export const addToCart = async (productId, quantity = 1) => {
  const res = await api.post("/cart/add", { productId, quantity });
  return res.data?.data;
};

export const getMyCart = async () => {
  const res = await api.get("/cart/my");
  return res.data?.data;
};

export const removeFromCart = async (productId) => {
  const res = await api.delete(`/cart/remove/${productId}`);
  return res.data;
};

export const updateCartQuantity = async (productId, quantity) => {
  const res = await api.patch("/cart/update", { productId, quantity });
  return res.data;
};
