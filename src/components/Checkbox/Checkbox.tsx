import styles from "./Checkbox.module.scss";

export default function Checkbox({
  text,
  checked,
  onChange,
  disabled = false,
}: {
  text: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
}) {
  return (
    <label className={styles.container}>
      <input
        checked={checked}
        type="checkbox"
        onChange={(e) => onChange(e.target.checked)}
        disabled={disabled}
      />
      <span className={styles.checkmark}></span>
      {text}
    </label>
  );
}
