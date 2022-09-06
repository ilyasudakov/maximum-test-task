import styles from "./CarFeature.module.scss";
import CarFeatureBasic from "./CarFeatureBasic";

export default function CarFeature({
  category,
  features,
}: {
  category: string;
  features: string[];
}) {
  return (
    <CarFeatureBasic
      category={category}
      feature={features.map((feature, index) => (
        <div key={feature?.toString()}>
          {feature}
          {index < features.length - 1 ? (
            <span className={styles.divider}> /</span>
          ) : null}
        </div>
      ))}
    />
  );
}
