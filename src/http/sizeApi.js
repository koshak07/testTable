import { $authHost, $host } from ".";
import jwt_decode from "jwt-decode";

export const createSize = async (size) => {
  const { data } = await $authHost.post("api/size", size);
  return data;
};

export const fetchSizes = async () => {
  const { data } = await $authHost.get("api/size");
  return data;
};
