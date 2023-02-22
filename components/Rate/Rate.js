import styles from "./rate.module.css";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import { IconContext } from "react-icons";
import { useEffect } from "react";

export default function Rate({
  rating,
  onClickLike,
  clickedLike,
  onClickDislike,
  clickedDislike,
}) {
  useEffect(() => {}, []);

  return (
    <div className={styles.rate}>
      <div
        onClick={onClickLike}
        className={styles.like}
        style={
          clickedLike
            ? { backgroundColor: "#F0A04B" }
            : { backgroundColor: "#E1EEDD" }
        }
      >
        <IconContext.Provider
          value={{
            color: "#183A1D",
            size: "1.5rem",
            className: "global-class-name",
          }}
        >
          <div>
            <FaThumbsUp />
          </div>
        </IconContext.Provider>
      </div>
      <div className={styles.rateNumber}>{rating}</div>
      <div
        onClick={onClickDislike}
        className={styles.dislike}
        style={
          clickedDislike
            ? { backgroundColor: "#F0A04B" }
            : { backgroundColor: "#E1EEDD" }
        }
      >
        <IconContext.Provider
          value={{
            color: "#183A1D",
            size: "1.5rem",
            className: "global-class-name",
          }}
        >
          <div>
            <FaThumbsDown />
          </div>
        </IconContext.Provider>
      </div>
    </div>
  );
}
