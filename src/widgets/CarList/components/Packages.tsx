import { CarType } from "../../../utils/API/carBrands";

import CarFeatureBasic from "./CarFeatureBasic";

import styles from "../CarList.module.scss";

const Packages = ({
  isOpen,
  setIsOpen,
  noFactoryOptions,
}: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  noFactoryOptions: CarType["feedData"]["noFactoryOptions"];
}) => {
  return (
    <CarFeatureBasic
      category="Пакеты"
      feature={
        <div className={styles.options} onClick={() => setIsOpen(!isOpen)}>
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
  );
};

export default Packages;
