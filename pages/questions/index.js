import styles from "./questions.module.css";
import axios from "axios";
import { getCookie } from "cookies-next";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import cookies from "js-cookie";
import {
  Footer,
  DropDown,
  Button,
  Enter,
  QuestionInList,
  Header,
} from "@/components/imports";

export default function Questions({ questions }) {
  const [showEnter, setShowEnter] = useState(false);
  const [value, setValue] = useState("");
  const [cookieToken, setCookieToken] = useState("");
  const [cookieName, setCookieName] = useState("");
  const [open, setOpen] = useState(false);
  const [renderedQuestions, setRenderedQuestions] = useState(questions);

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

  function handleOpen() {
    setOpen(!open);
  }

  function handleAll() {
    //  setFilter("all");
    setRenderedQuestions(questions);
    setOpen(false);
  }

  function handleAnswered() {
    // setFilter("answered");
    const answered = questions.filter(
      (question) => question.answers.length > 0
    );
    setRenderedQuestions(answered);

    setOpen(false);
  }

  function handleUnanswered() {
    // setFilter("unanswered");
    const answered = questions.filter(
      (question) => question.answers.length === 0
    );
    setRenderedQuestions(answered);
    setOpen(false);
  }

  function handlePersonal() {
    // setFilter("personal");

    const answered = questions.filter(
      (question) => question.author === cookieName
    );
    setRenderedQuestions(answered);
    setOpen(false);
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
          <DropDown
            handleAll={handleAll}
            handleAnswered={handleAnswered}
            handleUnanswered={handleUnanswered}
            handlePersonal={handlePersonal}
            open={open}
            trigger={handleOpen}
          />
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
          {renderedQuestions.map((element) => {
            return (
              <QuestionInList
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
