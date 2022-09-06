import { formatNumber } from "../../../utils/format";
import styles from "../CarList.module.scss";

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
        {renderPrice(price)}
        {` ₽`}
      </div>
      {optionalPrice > 0 && (
        <div className={styles.price_optional}>
          <div>
            {`Доп. опции на `}
            {renderPrice(optionalPrice)}
            {` ₽`}
          </div>
        </div>
      )}
    </div>
  );
};

export default Price;

const renderPrice = (_price: number) => {
  return (
    <span style={{ color: "var(--accent-primary)" }}>
      {formatNumber(_price, {
        maximumFractionDigits: 0,
        minimumFractionDigits: 0,
      })}
    </span>
  );
};
