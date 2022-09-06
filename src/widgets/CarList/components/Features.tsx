import styles from "../CarList.module.scss";

import { CarType } from "../../../utils/API/carBrands";

import { formatNumber } from "../../../utils/format";

import Button from "../../../components/Button/Button";
import CarFeature from "./CarFeature";
import Packages from "./Packages";
import Price from "./Price";

const Features = ({
  feedData: {
    equipmentVariantTransmissionType,
    equipmentVariantFuelType,
    color,
    price,
    parkingDuration,
    noFactoryOptions,
    engine: { engineCapacity, enginePower },
  },
  isOpen,
  setIsOpen,
}: CarType & { isOpen: boolean; setIsOpen: (value: boolean) => void }) => {
  return (
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
        <Packages
          isOpen={isOpen}
          noFactoryOptions={noFactoryOptions}
          setIsOpen={setIsOpen}
        />
      ) : null}
      <div className={`${styles.features_cols} ${styles.features_cols_price}`}>
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
  );
};

export default Features;
