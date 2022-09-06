import makeRequest from "../makeRequest";

export type CarType = {
  _id: string;
  feedData: {
    autoPriceSummary: number;
    brandName: string;
    modelName: string;
    equipmentVariantTransmissionType: string;
    productionYear: number;
    equipmentName: string;
    equipmentVariantName: string;
    vin: string;
    equipmentVariantTransmission: string;
    engine: {
      engineCapacity: number;
      enginePower: number;
      engineTransmission: string;
    };
  };
  photobank: { imgs: { url: string; urlThumb: string }[] };
};
export async function getCarsByBrand(brand: string) {
  const response = await makeRequest({
    url: `https://maximum.expert/api/stock-test?brand=${brand}`,
  });
  const data = await response.json();
  return data as { list: CarType[] };
}
