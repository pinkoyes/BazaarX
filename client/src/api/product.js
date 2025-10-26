import api from "./api";

export const createProduct = async (data) => {
  console.log(data);
  const res = await api.post("/product/", data);
  return res.data;
};
