import styles from "@/styles/Home.module.css";
import { RegisterForm, Footer, Description, Title } from "@/components/imports";

export default function Home() {
  return (
    <>
      <div className={styles.loginContainerWrapper}>
        <div className={styles.loginWrapper}>
          <Title />
          <Description text="Register" />
          <RegisterForm />
        </div>
      </div>
      <Footer />
    </>
  );
}
