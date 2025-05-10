import LoginForm from "../../components/LoginForm/LoginForm";
import Icon from "../../assets/Icons";
import styles from "./LoginPage.module.css";

const LoginPage = () => {
  return (
    <div className={styles.loginPage}>
      <Icon id="#icon-logo-mobile" />
      <LoginForm />
    </div>
  );
};

export default LoginPage;
