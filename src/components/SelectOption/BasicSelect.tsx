import ChevronIcon from "../../assets/chevron-down.svg";
import styles from "./BasicSelect.module.scss";

export default function BasicSelect({
  title,
  subtext,
  children,
  setIsOpen,
  isOpen,
}: {
  title: string;
  subtext?: string;
  children: React.ReactNode;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}) {
  return (
    <div className={`${styles.container} ${isOpen ? "" : styles.hidden}`}>
      <div className={styles.header} onClick={() => setIsOpen(!isOpen)}>
        <div>{title}</div>
        <ChevronIcon className={styles.chevron} />
      </div>
      <div className={styles.content}>
        {subtext ? <p className={styles.subtext}>{subtext}</p> : null}
        <div className={styles.inside}>{children}</div>
      </div>
    </div>
  );
}
