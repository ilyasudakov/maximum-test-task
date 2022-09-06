import Image from "next/future/image";
import { useState } from "react";
import SelectCheckbox from "../../components/SelectOption/SelectCheckbox";
import { PageProps } from "../../pages";
import { formatNumber } from "../../utils/format";
import styles from "./CarList.module.scss";
import CarFeature from "./components/CarFeature";
import CarFeatureBasic from "./components/CarFeatureBasic";

export const CAR_BRANDS = [
  "Audi",
  "Mitsubishi",
  "Volkswagen",
  "Kia",
  "Honda",
  "Hyundai",
] as const;

const initBrands = (brands: typeof CAR_BRANDS) =>
  brands.reduce((obj, cur) => ({ ...obj, [cur]: true }), {});

export default function CarList({ list }: PageProps) {
  const [items, setItems] = useState<{ [brand in string]: boolean }>(
    initBrands(CAR_BRANDS)
  );

  const changeAllItems = (value: boolean) =>
    setItems((items) => ({
      ...Object.entries(items).reduce(
        (newItems, [brand]) => ({ ...newItems, [brand]: value }),
        {}
      ),
    }));
  console.log(list);

  return (
    <main className={styles.main}>
      <SelectCheckbox
        title="Марка"
        onChange={(newValue, name) =>
          setItems((items) => ({ ...items, [name]: newValue }))
        }
        items={items}
      />
      <div className={styles.grid}>
        {list &&
          Object.entries(items).map(([brand, show]) => {
            if (!show) return null;
            return list[brand].map(
              ({
                _id,
                feedData: {
                  brandName,
                  productionYear,
                  modelName,
                  vin,
                  equipmentVariantTransmission,
                  equipmentVariantTransmissionType,
                  equipmentVariantName,
                  equipmentVariantDriveType,
                  equipmentVariantFuelType,
                  color,
                  baseOptions,
                  parkingDuration,
                  engine: { engineTransmission, engineCapacity, enginePower },
                },
                photobank: { imgs },
              }) => (
                <div className={styles.card} key={_id}>
                  <div className={styles.title}>
                    {`${brandName} ${modelName} ${equipmentVariantName}`}
                    <span className={styles.production_year}>
                      {productionYear}
                    </span>
                  </div>
                  <div className={styles.vin}>{vin}</div>
                  <Image
                    className={styles.image}
                    src={imgs[0].urlThumb}
                    alt={modelName}
                    width={700}
                    height={450}
                  />
                  <div className={styles.features}>
                    <CarFeature
                      category="Двигатель"
                      features={[
                        `${formatNumber(engineCapacity)} л`,
                        `${enginePower} лс`,
                        equipmentVariantFuelType,
                      ]}
                    />
                    <CarFeature
                      category="КПП"
                      features={[equipmentVariantTransmissionType]}
                    />
                    <CarFeature category="Цвет" features={[color]} />
                    <CarFeature
                      category="Пробег"
                      features={[
                        `${formatNumber(parkingDuration, {
                          minimumFractionDigits: 0,
                          maximumFractionDigits: 0,
                        })} км`,
                      ]}
                    />
                    <CarFeatureBasic
                      category="Пакеты"
                      feature={
                        <div className={styles.options}>
                          <div className={styles.all_options}>
                            <div>{baseOptions[0]?.name}</div>
                          </div>
                          {baseOptions.length > 1 && (
                            <div
                              className={styles.more_options_text}
                            >{`(+ ещё ${baseOptions.length} пакет)`}</div>
                          )}
                        </div>
                      }
                    />
                  </div>
                </div>
              )
            );
          })}
      </div>
    </main>
  );
}
