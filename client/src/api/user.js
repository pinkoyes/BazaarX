import api from "./api";

export const fetchUserInfo = async () => {
  const res = await api.get("/user/info");
  return res.data?.data;
};

export const updateUserInfo = async (formData) => {
  const res = await api.patch("/user/update", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  console.log(res);
  return res.data?.data;
};

export const deleteUser = async () => {
  const res = await api.delete("/user/delete");
  return res.data?.data;
};
