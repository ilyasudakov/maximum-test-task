import { useKeenSlider } from "keen-slider/react";
import Image from "next/future/image";
import { CarType } from "../../../utils/API/carBrands";
import styles from "../CarList.module.scss";

const Slider = ({
  imgs,
  modelName,
}: {
  imgs: CarType["photobank"]["imgs"];
  modelName: CarType["feedData"]["modelName"];
}) => {
  const [sliderRef] = useKeenSlider(
    {
      slides: { perView: 1.2, spacing: 10 },
    },
    []
  );

  return (
    <div ref={sliderRef} className={"keen-slider"}>
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
  );
};

export default Slider;
