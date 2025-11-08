import api from "./api";

export const placeOrder = async (data) => {
  const res = await api.post("/order/", data);
  return res.data?.data;
};

export const myOrders = async () => {
  const res = await api.get("/order/my");
  return res.data.data;
};

export const fetchSellerOrders = async () => {
  const res = await api.get("/order/seller");
  return res.data?.data;
};

export const updateOrderStatus = async (id, status) => {
  const res = await api.patch(`/order/${id}/status`, { status });
  return res.data?.data;
};
