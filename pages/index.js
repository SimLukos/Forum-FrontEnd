import styles from "@/styles/Home.module.css";
import Description from "@/components/Description/Description";
import { LoginForm, Title, Footer } from "@/components/imports";
import { useRouter } from "next/router";

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
          <LoginForm />
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
