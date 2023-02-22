import styles from "./questions.module.css";
import Header from "@/components/Header/Header";
import Question from "@/components/QuestionInList/QuestionInList";
import axios from "axios";
import Enter from "../../components/Enter/Enter";
import Button from "@/components/Button/Button";
import { getCookie } from "cookies-next";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import cookies from "js-cookie";
import Footer from "@/components/Footer/Footer";

export default function Questions({ questions }) {
  const [showEnter, setShowEnter] = useState(false);
  const [value, setValue] = useState("");
  const [cookieToken, setCookieToken] = useState("");
  const [cookieName, setCookieName] = useState("");

  const router = useRouter();

  function handleValue(event) {
    setValue(event.target.value);
  }

  function handleEnter() {
    setShowEnter(true);
  }

  function handleCancel() {
    setShowEnter(false);
  }

  useEffect(() => {
    setCookieToken(cookies.get(`token`));
    setCookieName(cookies.get(`userName`));
  }, []);

  async function handleSubmit() {
    if (value) {
      try {
        await axios.post(
          `http://localhost:3000/question/`,
          {
            author: cookieName,
            topic: value,
          },
          {
            headers: { jwt_token: cookieToken },
          }
        );

        router.reload(window.location.pathname);
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("Question is empty.");
    }
  }

  return (
    <>
      <Header />
      <div className={styles.questionsWrapper}>
        <div className={styles.buttonWrapper}>
          <Button onClick={handleEnter} text={"Ask Question"} />
        </div>
        {showEnter ? (
          <Enter
            text={"Question"}
            onChange={handleValue}
            cancel={handleCancel}
            submit={handleSubmit}
          />
        ) : null}
        <div className={styles.title}>
          <h1>Asked Questions</h1>
        </div>
        <div className={styles.questionList}>
          {questions.map((element) => {
            console.log(element.answers.length);
            return (
              <Question
                author={element.author}
                topic={element.topic}
                date={element.date}
                key={element._id}
                id={element._id}
                numberAnswers={element.answers.length}
              />
            );
          })}
        </div>
      </div>
      <Footer />
    </>
  );
}

export async function getServerSideProps(context) {
  const response = await axios.get(`http://localhost:3000/questions`, {
    headers: {
      jwt_token: getCookie("token", context),
    },
  });

  return {
    props: {
      questions: response.data.allQuestions,
    },
  };
}
