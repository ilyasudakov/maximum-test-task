import { useState } from "react";

import styles from "./CarList.module.scss";
import "keen-slider/keen-slider.min.css";

import { PageProps } from "../../pages";

import { CarType } from "../../utils/API/carBrands";

import SelectCheckbox from "../../components/SelectOption/SelectCheckbox";
import Slider from "./components/Slider";
import Modal from "./components/Modal";
import Features from "./components/Features";

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
      <div className="row">
        <div className={styles.grid + " col-12"}>
          {list &&
            Object.entries(items).map(([brand, show]) => {
              if (!show) return null;
              return list[brand].map((data) => (
                <Card key={data._id} {...data} />
              ));
            })}
        </div>
      </div>
    </main>
  );
}

const Card = (data: CarType) => {
  const [isOpen, setIsOpen] = useState(false);
  const {
    brandName,
    modelName,
    equipmentVariantName,
    noFactoryOptions,
    productionYear,
    vin,
  } = data.feedData;

  return (
    <div className={styles.card} key={data._id}>
      {isOpen && (
        <Modal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          noFactoryOptions={noFactoryOptions}
        />
      )}
      <div className={styles.title}>
        {`${brandName} ${modelName} ${equipmentVariantName}`}
        <span className={styles.production_year}>{productionYear}</span>
      </div>
      <div className={styles.vin}>{vin}</div>
      <Slider imgs={data.photobank.imgs} modelName={modelName} />
      <Features
        isOpen={isOpen}
        setIsOpen={(value) => setIsOpen(value)}
        {...data}
      />
    </div>
  );
};
