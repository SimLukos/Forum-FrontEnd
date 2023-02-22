import styles from "./answer.module.css";
import cookies from "js-cookie";
import { useRouter } from "next/router";
import { FaTrash } from "react-icons/fa";
import { IconContext } from "react-icons";
import { useEffect, useState } from "react";
import axios from "axios";
import Rate from "../Rate/Rate";
import { headers } from "@/next.config";

export default function Answer({
  author,
  answer,
  date,
  id,
  rating,
  liked,
  disliked,
}) {
  const router = useRouter();
  const [userName, setUserName] = useState("");
  const [token, setToken] = useState("");
  const [like, setLike] = useState(false);
  const [dislike, setDislike] = useState(false);

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

  async function handleLike() {
    try {
      await axios.post(
        `http://localhost:3000/answer/${id}`,
        {
          rate: true,
          userName: userName,
        },
        {
          headers: { jwt_token: token },
        }
      );
      setLike(true);
      setDislike(false);

      router.reload(window.location.pathname);
    } catch (e) {
      console.log(e);
    }
  }

  async function handleDisLike() {
    try {
      await axios.post(
        `http://localhost:3000/answer/${id}`,
        {
          rate: false,
          userName: userName,
        },
        {
          headers: { jwt_token: token },
        }
      );
      setLike(false);
      setDislike(true);

      router.reload(window.location.pathname);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    setUserName(cookies.get("userName"));
    setToken(cookies.get("token"));

    if (liked.includes(userName)) {
      setLike(true);
    } else if (disliked.includes(userName)) {
      setDislike(true);
    }
  });

  return (
    <div className={styles.answerWrapper}>
      <Rate
        clickedLike={like}
        clickedDislike={dislike}
        rating={rating}
        onClickLike={handleLike}
        onClickDislike={handleDisLike}
      />
      <div>
        <div className={styles.deleteWrapper}>
          <h2 className={styles.author}>{author}</h2>
          {author === userName ? (
            <div onClick={handleClick} className={styles.bin}>
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
            </div>
          ) : null}
        </div>

        <div>
          <p className={styles.answer}>{answer}</p>
        </div>
        <div className={styles.dateWrapper}>
          <p className={styles.date}>{date}</p>
        </div>
      </div>
    </div>
  );
}
