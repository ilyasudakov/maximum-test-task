import styles from "./Button.module.scss";

export default function Button({ children }: { children: React.ReactNode }) {
  return <button className={styles.container}>{children}</button>;
}
