import styles from "./registerForm.module.css";
import Input from "../Input/Input";
import Button from "../Button/Button";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/router";

export default function Form() {
  const router = useRouter();

  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");

  async function handleClick() {
    try {
      if (userName && userEmail && userPassword) {
        await axios
          .post(`http://localhost:3000/register`, {
            name: userName,
            email: userEmail,
            password: userPassword,
          })
          .then((response) => {
            if (response.status >= 200 && response.status <= 299) {
              router.push(`/`);
            } else {
              alert(response.status);
            }
          });
      } else {
        alert("Fill all the fields");
      }
    } catch (error) {
      console.log(error);
    }
  }

  function handleNameChange(event) {
    setUserName(event.target.value);
  }

  function handleEmailChange(event) {
    setUserEmail(event.target.value);
  }

  function handlePasswordChange(event) {
    setUserPassword(event.target.value);
  }

  return (
    <div className={styles.formWrapper}>
      <Input
        onChange={handleNameChange}
        value={userName}
        type="text"
        placeholder="Name:"
      />
      <Input
        onChange={handleEmailChange}
        value={userEmail}
        type="email"
        placeholder="Email:"
      />
      <Input
        onChange={handlePasswordChange}
        value={userPassword}
        type="password"
        placeholder="Password:"
      />
      <Button text="Sign Up" onClick={handleClick} />
    </div>
  );
}
