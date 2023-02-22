import styles from "./input.module.css";

export default function Input({ type, placeholder, onChange, value }) {
  return (
    <input
      className={styles.input}
      type={type}
      placeholder={placeholder}
      onChange={onChange}
      value={value}
    />
  );
}
