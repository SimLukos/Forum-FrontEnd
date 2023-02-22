import axios from "axios";
import Header from "@/components/Header/Header";
import Question from "@/components/Question/Question";
import Answer from "@/components/Answer/Answer";
import styles from "./styles.module.css";
import Button from "@/components/Button/Button";
import EnterAnswer from "@/components/Enter/Enter";
import { useEffect, useState } from "react";
import cookies from "js-cookie";
import { useRouter } from "next/router";
import Footer from "@/components/Footer/Footer";

export default function questionAndAnswers({ question, answers }) {
  const [showEnter, setShowEnter] = useState(false);
  const [value, setValue] = useState("");
  const [cookieToken, setCookieToken] = useState("");
  const [cookieName, setCookieName] = useState("");

  const router = useRouter();
  const { id } = router.query;

  function handleEnter() {
    setShowEnter(true);
  }

  function handleCancel() {
    setShowEnter(false);
  }

  async function handleSubmit() {
    if (value) {
      try {
        await axios.post(
          `http://localhost:3000/question/${id}/answer`,
          {
            author: cookieName,
            answer: value,
          },
          {
            headers: { jwt_token: cookieToken },
          }
        );

        router.reload(window.location.pathname);
      } catch (e) {
        console.log(e);
      }
    } else {
      alert("Answer is empty.");
    }
  }

  async function handleDelete() {
    try {
      await axios
        .delete(`http://localhost:3000/question/${id}`, {
          headers: { jwt_token: cookieToken },
        })
        .then(() => {
          router.push("/questions");
        });
    } catch (e) {
      console.log(e);
    }
  }

  function handleValue(event) {
    setValue(event.target.value);
  }

  useEffect(() => {
    const cookieToken = cookies.get(`token`);
    const cookieName = cookies.get(`userName`);
    setCookieToken(cookieToken);
    setCookieName(cookieName);
  }, []);

  return (
    <>
      <Header />
      <div className={styles.title}>
        <h1>{question.author} asked:</h1>
      </div>
      <div>
        <Question
          topic={question.topic}
          author={question.author}
          date={question.date}
        />
        <div className={styles.buttonWrapper}>
          <Button onClick={handleEnter} text={"Write Answer"} />
          {cookieName === question.author ? (
            <Button onClick={handleDelete} text={"Delete Question"} />
          ) : null}
        </div>
        {showEnter ? (
          <EnterAnswer
            text={"answer"}
            onChange={handleValue}
            submit={handleSubmit}
            cancel={handleCancel}
          />
        ) : null}

        <div className={styles.answersWrapper}>
          {answers.map((element) => {
            return (
              <Answer
                answer={element.answer}
                author={element.author}
                date={element.date}
                key={element._id}
                id={element._id}
                rating={element.rating}
                liked={element.liked}
                disliked={element.disliked}
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
  const response = await axios.get(
    `http://localhost:3000/question/${context.query.id}`,
    {
      headers: {
        jwt_token: context.req.cookies.token,
      },
    }
  );

  return {
    props: {
      question: response.data.question,
      answers: response.data.answers,
    },
  };
}
