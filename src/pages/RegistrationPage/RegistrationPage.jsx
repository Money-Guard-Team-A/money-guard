import RegistrationForm from "../../components/RegistrationForm/RegistrationForm";
import Icon from "../../assets/Icons";
import styles from "./RegistrationPage.module.css";
import { useEffect } from "react";

const RegistrationPage = () => {
  useEffect(() => {
    document.body.classList.add(styles.registerPageBody);
    return () => {
      document.body.classList.remove(styles.registerPageBody);
    };
  }, []);
  return (
    <div className={styles.registrationPage}>
      <Icon id="#icon-logo-mobile" />
      <RegistrationForm />
    </div>
  );
};

export default RegistrationPage;
