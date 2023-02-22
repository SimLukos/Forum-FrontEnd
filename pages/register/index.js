import styles from "@/styles/Home.module.css";
import Title from "@/components/Title/Title";
import Description from "@/components/Description/Description";
import RegisterForm from "../../components/RegisterForm/RegisterForm";
import Footer from "@/components/Footer/Footer";

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
