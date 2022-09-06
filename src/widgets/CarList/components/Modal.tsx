import styles from "../CarList.module.scss";

import CrossIcon from "../../../assets/cross.svg";

import { CarType } from "../../../utils/API/carBrands";

const Modal = ({
  isOpen,
  setIsOpen,
  noFactoryOptions,
}: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  noFactoryOptions: CarType["feedData"]["noFactoryOptions"];
}) => {
  if (!isOpen) return null;
  return (
    <div className={styles.modal}>
      <div className={styles.modal_title}>
        <div>Пакеты опций</div>
        <CrossIcon onClick={() => setIsOpen(false)} />
      </div>
      <div className={styles.modal_list}>
        {noFactoryOptions.map(({ name }) => (
          <div key={name}>{name}</div>
        ))}
      </div>
    </div>
  );
};

export default Modal;
