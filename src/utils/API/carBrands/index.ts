import makeRequest from "../makeRequest";

export type CarType = {
  _id: string;
  feedData: { brandName: string; modelName: string };
};
export async function getCarsByBrand(brand: string) {
  const response = await makeRequest({
    url: `https://maximum.expert/api/stock-test?brand=${brand}`,
  });
  const data = await response.json();
  return data as { list: CarType[] };
}
