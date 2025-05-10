import LoginForm from "../../components/LoginForm/LoginForm";
import Icon from "../../assets/Icons";
import styles from "./LoginPage.module.css";
import { useEffect } from "react";

const LoginPage = () => {
  useEffect(() => {
    document.body.classList.add(styles.loginPageBody);
    return () => {
      document.body.classList.remove(styles.loginPageBody);
    };
  }, []);
  return (
    <div className={styles.loginPage}>
      <Icon id="#icon-logo-mobile" />
      <LoginForm />
    </div>
  );
};

export default LoginPage;
