import Image from "next/future/image";
import { useState } from "react";
import Button from "../../components/Button/Button";
import SelectCheckbox from "../../components/SelectOption/SelectCheckbox";
import { PageProps } from "../../pages";
import { CarType } from "../../utils/API/carBrands";
import { formatNumber } from "../../utils/format";
import styles from "./CarList.module.scss";
import CarFeature from "./components/CarFeature";
import CarFeatureBasic from "./components/CarFeatureBasic";
import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";

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
      <div className={styles.grid}>
        {list &&
          Object.entries(items).map(([brand, show]) => {
            if (!show) return null;
            return list[brand].map((data) => <Card key={data._id} {...data} />);
          })}
      </div>
    </main>
  );
}

const Card = ({
  _id,
  feedData: {
    brandName,
    productionYear,
    modelName,
    vin,
    equipmentVariantTransmissionType,
    equipmentVariantName,
    equipmentVariantFuelType,
    color,
    price,
    parkingDuration,
    noFactoryOptions,
    engine: { engineCapacity, enginePower },
  },
  photobank: { imgs },
}: CarType) => {
  const [sliderRef, instanceRef] = useKeenSlider(
    {
      slides: { perView: 1.2, spacing: 10 },
    },
    []
  );
  return (
    <div className={styles.card} key={_id}>
      <div className={styles.title}>
        {`${brandName} ${modelName} ${equipmentVariantName}`}
        <span className={styles.production_year}>{productionYear}</span>
      </div>
      <div className={styles.vin}>{vin}</div>
      {/* <Image
        className={styles.image}
        src={imgs[0].urlThumb}
        alt={modelName}
        width={700}
        height={450}
      /> */}
      <div ref={sliderRef} className="keen-slider">
        {imgs
          .filter((_, index) => index < 3)
          .map(({ urlThumb }) => (
            <Image
              key={urlThumb}
              className={styles.image + " keen-slider__slide"}
              src={urlThumb}
              alt={modelName}
              width={700}
              height={450}
            />
          ))}
      </div>
      <div className={styles.features}>
        <div className={styles.features_cols}>
          <div className={styles.features_row}>
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
          </div>
          <div className={styles.features_row}>
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
          </div>
        </div>
        {noFactoryOptions.length > 0 ? (
          <CarFeatureBasic
            category="Пакеты"
            feature={
              <div className={styles.options}>
                <div className={styles.all_options}>
                  <div>{noFactoryOptions[0]?.name}</div>
                </div>
                {noFactoryOptions.length > 1 && (
                  <div
                    className={styles.more_options_text}
                  >{`(+ ещё ${noFactoryOptions.length} пакет)`}</div>
                )}
              </div>
            }
          />
        ) : null}
        <div
          className={`${styles.features_cols} ${styles["features_cols--price"]}`}
        >
          <div className={styles.features_row}>
            <Price
              price={price}
              optionalPrice={noFactoryOptions.reduce(
                (sum, { price }) => sum + price,
                0
              )}
            />
          </div>
          <div className={styles.features_row}>
            <Button>КУПИТЬ</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Price = ({
  price,
  optionalPrice = 0,
}: {
  price: number;
  optionalPrice?: number;
}) => {
  return (
    <div className={styles.price}>
      <div>
        <span style={{ color: "var(--accent-primary)" }}>
          {formatNumber(price, {
            maximumFractionDigits: 0,
            minimumFractionDigits: 0,
          })}
        </span>
        {` ₽`}
      </div>
      {optionalPrice > 0 && (
        <div className={styles.price_optional}>
          <div>
            {`Доп. опции на `}
            <span style={{ color: "var(--accent-primary)" }}>
              {formatNumber(optionalPrice, {
                maximumFractionDigits: 0,
                minimumFractionDigits: 0,
              })}
            </span>
            {` ₽`}
          </div>
        </div>
      )}
    </div>
  );
};
