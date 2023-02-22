import styles from "./question.module.css";

export default function Question({ author, date, topic, numberAnswers }) {
  return (
    <div className={styles.questionWrapper}>
      <div>
        <h2 className={styles.author}>{author}</h2>
        <p className={styles.topic}>{topic}</p>
      </div>
      <div className={styles.dateWrapper}>
        <p className={styles.date}>{date}</p>
      </div>
    </div>
  );
}
