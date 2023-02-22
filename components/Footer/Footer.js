import styles from "./footer.module.css";

export default function Footer() {
  return (
    <div className={styles.footerWrapper}>
      <h1>{new Date().getFullYear()} &#169; By SimLukos</h1>
    </div>
  );
}
