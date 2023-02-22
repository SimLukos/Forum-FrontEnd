import styles from "./description.module.css";

export default function Description({ text }) {
  return (
    <>
      <h4 className={styles.heading}>
        Have a question? Start asking questions!
      </h4>
      <p className={styles.underHeading}>Please {text}</p>
    </>
  );
}
