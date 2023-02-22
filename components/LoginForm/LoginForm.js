import styles from "./loginForm.module.css";
import Input from "../Input/Input";
import Button from "../Button/Button";
import Wrong from "../Wrong/Wrong";
import { useRouter } from "next/router";
import { useState } from "react";
import axios from "axios";
import { setCookie } from "cookies-next";
import cookies from "js-cookie";

export default function Form() {
  const router = useRouter();

  const [userEmail, setUserEmail] = useState();
  const [userPassword, setUserPasword] = useState();
  const [showIncorrect, setShowIncorrect] = useState(false);
  const [fill, setFill] = useState(false);

  function handleEmailChange(event) {
    setUserEmail(event.target.value);
  }

  function handlePasswordChange(event) {
    setUserPasword(event.target.value);
  }

  async function handleLoginClick() {
    try {
      if (userEmail && userPassword) {
        await axios
          .post(`http://localhost:3000/login`, {
            email: userEmail,
            password: userPassword,
          })
          .then((response) => {
            setShowIncorrect(true);
            setFill(false);

            cookies.set("token", response.data.jwt_token);
            cookies.set("userName", response.data.userName);
            router.push(`questions`);
          });
      } else {
        setFill(true);
        setShowIncorrect(false);
      }
    } catch (error) {
      setShowIncorrect(true);
      setFill(false);
      console.log(error);
    }
  }

  return (
    <div className={styles.formWrapper}>
      {showIncorrect ? (
        <Wrong
          text={"Email or Password is incorrect. Please check and try again."}
        />
      ) : null}

      {fill ? <Wrong text={"Please fill all fields"} /> : null}
      <Input
        value={userEmail}
        onChange={handleEmailChange}
        type="email"
        placeholder="Email:"
      />
      <Input
        value={userPassword}
        onChange={handlePasswordChange}
        type="password"
        placeholder="Password:"
      />
      <Button onClick={handleLoginClick} text="Login" />
    </div>
  );
}
