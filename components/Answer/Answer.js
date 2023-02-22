import styles from "./answer.module.css";
import cookies from "js-cookie";
import { useRouter } from "next/router";
import { FaTrash } from "react-icons/fa";
import { IconContext } from "react-icons";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Answer({ author, answer, date, id }) {
  const router = useRouter();
  const [userName, setUserName] = useState("");
  const [token, setToken] = useState("");

  async function handleClick() {
    try {
      await axios.delete(`http://localhost:3000/answer/${id}`, {
        headers: {
          jwt_token: token,
        },
      });

      router.reload(window.location.pathname);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    setUserName(cookies.get("userName"));
    setToken(cookies.get("token"));
  });

  return (
    <div className={styles.answerWrapper}>
      <div className={styles.deleteWrapper}>
        <h2 className={styles.author}>{author}</h2>
        <div onClick={handleClick} className={styles.bin}>
          {author === userName ? (
            <IconContext.Provider
              value={{
                color: "#183A1D",
                size: "1.5rem",
                className: "global-class-name",
              }}
            >
              <div>
                <FaTrash />
              </div>
            </IconContext.Provider>
          ) : null}
        </div>
      </div>

      <div>
        <p className={styles.answer}>{answer}</p>
      </div>
      <div className={styles.dateWrapper}>
        <p className={styles.date}>{date}</p>
      </div>
    </div>
  );
}
