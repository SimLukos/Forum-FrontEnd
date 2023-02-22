import styles from "./wrong.module.css";

export default function Wrong({ text }) {
  return (
    <div className={styles.wrongWrapper}>
      <h5 className={styles.wrong}>{text}</h5>
    </div>
  );
}
