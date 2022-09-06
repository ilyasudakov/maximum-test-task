import styles from "./CarFeature.module.scss";

export default function CarFeatureBasic({
  category,
  feature,
}: {
  category: string;
  feature: React.ReactNode | string;
}) {
  return (
    <div className={styles.container}>
      <div className={styles.category}>{category}</div>
      <div className={styles.feature}>{feature}</div>
    </div>
  );
}
