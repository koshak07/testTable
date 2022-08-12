import { $authHost, $host } from ".";

export const createVendorCode = async (vendorCode) => {
  const { data } = await $authHost.post("api/vendorCode", vendorCode);
  return data;
};

export const fetchVendorCodes = async () => {
  const { data } = await $authHost.get("api/vendorCode");

  return data;
};
export const fetchOneVendorCodes = async (id) => {
  const { data } = await $authHost.get("api/vendorCode/" + id);
  return data;
};
