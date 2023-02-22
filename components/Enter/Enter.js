import styles from "./enter.module.css";
import Button from "../Button/Button";

export default function Enter({ text, cancel, submit, onChange }) {
  return (
    <div className={styles.enterWrapper}>
      <h4>Write your {text}:</h4>
      <textarea onChange={onChange} rows="4" cols="50" />
      <div className={styles.buttonWrapper}>
        <Button onClick={submit} text={"Submit"} />
        <Button onClick={cancel} text={"Cancel"} />
      </div>
    </div>
  );
}
