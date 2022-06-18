import { userRequest } from "../request";

export const createOrder = async (order) => {
  const res = await userRequest.post("/orders", order);
  return res;
};

export const getUserOrder = async () => {
  const res = await userRequest.get("/orders/myOrders");
  return res.data;
};
