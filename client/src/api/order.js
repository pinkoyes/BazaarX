import api from "./api";

export const placeOrder = async (data) => {
  const res = await api.post("/order", data);
  return res.data?.data;
};

export const fetchMyOrders = async () => {
  const res = await api.get("/order/my-orders");
  return res.data?.data;
};

export const fetchSellerOrders = async () => {
  const res = await api.get("/order/seller-orders");
  return res.data?.data;
};

export const updateOrderStatus = async (orderId, status) => {
  const res = await api.patch(`/order/update/${orderId}`, { status });
  return res.data?.data;
};
