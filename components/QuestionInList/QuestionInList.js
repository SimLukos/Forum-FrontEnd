import styles from "./questionInList.module.css";
import { useRouter } from "next/router";
import { FaComment } from "react-icons/fa";
import { IconContext } from "react-icons";

export default function Question({ author, date, topic, id, numberAnswers }) {
  const router = useRouter();

  function handleClick() {
    console.log("clicked");
    router.push(`/question/${id}`);
  }

  return (
    <div onClick={handleClick} className={styles.questionWrapper}>
      <div>
        <h2 className={styles.author}>{author}</h2>
        <p className={styles.topic}>{topic}</p>
      </div>
      <div className={styles.dateWrapper}>
        <div className={styles.answersNumber}>
          <p className={styles.date}>{numberAnswers}</p>
          <IconContext.Provider
            value={{
              color: "#183A1D",
              size: "1.5rem",
              className: "global-class-name",
            }}
          >
            <div>
              <FaComment />
            </div>
          </IconContext.Provider>
        </div>

        <p className={styles.date}>{date}</p>
      </div>
    </div>
  );
}
