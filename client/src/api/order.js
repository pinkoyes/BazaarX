import api from "./api";

export const placeOrder = async (data) => {
  console.log(data);
  const res = await api.post("/order/", data);
  return res.data?.data;
};
