import { Button } from "../imports";
import styles from "./dropDown.module.css";

export default function DropDown({
  open,
  trigger,
  handleAll,
  handleAnswered,
  handleUnanswered,
  handlePersonal,
}) {
  return (
    <div className={styles.dropdown}>
      <Button text={"Filter Questions"} onClick={trigger} />
      {open ? (
        <ul className={styles.menu}>
          <li className={styles.menuItem}>
            <button onClick={handleAll}>All</button>
          </li>
          <li className={styles.menuItem}>
            <button onClick={handleAnswered}>Answered</button>
          </li>
          <li className={styles.menuItem}>
            <button onClick={handleUnanswered}>Unanswered</button>
          </li>
          <li className={styles.menuItem}>
            <button onClick={handlePersonal}>Personal</button>
          </li>
        </ul>
      ) : null}
    </div>
  );
}
