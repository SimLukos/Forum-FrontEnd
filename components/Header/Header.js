import styles from "./header.module.css";
import Title from "../Title/Title";
import Button from "../Button/Button";
import cookies from "js-cookie";
import { useRouter } from "next/router";
import { FaUser } from "react-icons/fa";
import { IconContext } from "react-icons";

export default function Header({ userName }) {
  const router = useRouter();

  function handleLogOutClick() {
    cookies.remove(`token`);
    cookies.remove(`userName`);

    router.push(`/`);
  }

  return (
    <div className={styles.header}>
      <Title />
      <div className={styles.infoWrapper}>
        <div className={styles.userWrapper}>
          <IconContext.Provider
            value={{
              color: "#183A1D",
              size: "1.5rem",
              className: "global-class-name",
            }}
          >
            <div>
              <FaUser />
            </div>
          </IconContext.Provider>
        </div>

        <Button onClick={handleLogOutClick} text={"Log Out"} />
      </div>
    </div>
  );
}
