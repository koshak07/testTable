import { $authHost, $host } from ".";

export const createColor = async (color) => {
  const { data } = await $authHost.post("api/color", color);
  return data;
};

export const fetchColors = async () => {
  const { data } = await $authHost.get("api/color");
  return data;
};
