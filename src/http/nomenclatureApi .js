import { $authHost, $host } from ".";

export const createNomenclature = async (nomenclature) => {
  const { data } = await $authHost.post("api/nomenclature", nomenclature);

  return data;
};

export const fetchNomenclatures = async () => {
  const { data } = await $authHost.get("api/nomenclature");
  return data;
};
export const fetchOneNomenclatures = async (id) => {
  const { data } = await $authHost.get("api/nomenclature/" + id);
  return data;
};
