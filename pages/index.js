import styles from "@/styles/Home.module.css";
import Title from "@/components/Title/Title";
import Description from "@/components/Description/Description";
import Form from "@/components/LoginForm/LoginForm";
import { useRouter } from "next/router";
import Footer from "@/components/Footer/Footer";

export default function Home() {
  const router = useRouter();

  function handleSignClick() {
    router.push(`register`);
  }

  return (
    <>
      <div className={styles.loginContainerWrapper}>
        <div className={styles.loginWrapper}>
          <Title />
          <Description text="Login" />
          <Form />
          <p className={styles.text}>
            Don’t have an account yet?{" "}
            <button onClick={handleSignClick} className={styles.button}>
              Sign up
            </button>
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
}
