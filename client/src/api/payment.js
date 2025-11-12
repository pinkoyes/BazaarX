import api from "./api";

export const verifyPayment = async (data) => {
  const res = await api.post("/payment/verify", data);
  return res.data?.data;
};
