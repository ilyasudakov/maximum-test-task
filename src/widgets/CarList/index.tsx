import Image from "next/future/image";
import { useState } from "react";
import SelectCheckbox from "../../components/SelectOption/SelectCheckbox";
import { PageProps } from "../../pages";
import styles from "./CarList.module.scss";

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
                  equipmentVariantName,
                  engine: { engineTransmission, engineCapacity },
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
                </div>
              )
            );
          })}
      </div>
    </main>
  );
}
