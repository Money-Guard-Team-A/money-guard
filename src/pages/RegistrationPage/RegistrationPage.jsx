import RegistrationForm from "../../components/RegistrationForm/RegistrationForm";
import Icon from "../../assets/Icons";
import styles from "./RegistrationPage.module.css";

const RegistrationPage = () => {
  return (
    <div className={styles.registrationPage}>
      <Icon id="#icon-logo-mobile" />
      <RegistrationForm />
    </div>
  );
};

export default RegistrationPage;
