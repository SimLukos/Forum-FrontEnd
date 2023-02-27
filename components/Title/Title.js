import styles from "./title.module.css";

export default function Title() {
  return (
    <div className={styles.titleWrapper}>
      <h1 className={styles.title}>Q&A</h1>
    </div>
  );
}
