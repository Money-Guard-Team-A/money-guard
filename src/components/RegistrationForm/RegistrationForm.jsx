import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { Field, Form, Formik, ErrorMessage, useFormikContext } from "formik";
import { register } from "../../redux/auth/operations";
import { useNavigate } from "react-router-dom";
import styles from "./RegistrationForm.module.css";
import Icon from "../../assets/Icons";
import PasswordStrengthBar from "react-password-strength-bar-with-style-item";

function PasswordStrengthIndicator() {
  const { values } = useFormikContext();

  return (
    <div className={styles.passwordBar}>
      <PasswordStrengthBar
        password={values.password}
        barColors={["#ff4d4d", "#ff884d", "#ffd24d", "#c6ff4d", "#4dff88"]}
        height={6}
        borderRadius={3}
        showLabels={true}
        shortScoreWord={true}
        scoreWords={["Çok Zayıf", "Zayıf", "Orta", "Güçlü", "Çok Güçlü"]}
      />
    </div>
  );
}

export default function RegistrationPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialValues = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const validationSchema = Yup.object({
    username: Yup.string().required("İsim zorunludur"),
    email: Yup.string()
      .email("Geçerli email giriniz")
      .required("Email zorunludur"),
    password: Yup.string()
      .min(6, "Şifre en az 6 karakter olmalıdır")
      .max(12, "Şifre en fazla 12 karakter olmalıdır")
      .required("Şifre zorunludur"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Şifreler eşleşmiyor")
      .required("Şifre onayı zorunludur"),
  });

  const registerSubmit = (values) => {
    const { confirmPassword, ...submitData } = values;
    dispatch(register(submitData));
  };

  return (
    <div className={styles.registerForm}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={registerSubmit}
      >
        <Form className={styles.form}>
          <div className={styles.usernameSection}>
            <Icon
              id="#icon-user"
              className={styles.user}
              style={{ width: "24px", height: "24px", fill: "#FFFFFF66" }}
            />
            <Field
              type="text"
              id="username"
              name="username"
              placeholder="Name"
            />
          </div>
          <ErrorMessage
            name="username"
            component="div"
            className={styles.error}
          />
          <div className={styles.mailSection}>
            <Icon
              id="#icon-email"
              className={styles.email}
              style={{ width: "24px", height: "24px", fill: "#FFFFFF66" }}
            />
            <Field type="email" id="email" name="email" placeholder="E-mail" />
          </div>
          <ErrorMessage name="email" component="div" className={styles.error} />
          <div className={styles.passwordSection}>
            <Icon
              id="#icon-lock"
              className={styles.lock}
              style={{ width: "24px", height: "24px", fill: "#FFFFFF66" }}
            />
            <Field
              type="password"
              id="password"
              name="password"
              placeholder="Password"
            />
          </div>
          <ErrorMessage
            name="password"
            component="div"
            className={styles.error}
          />
          <div className={styles.confirmPasswordSection}>
            <Icon
              id="#icon-lock"
              className={styles.lock}
              style={{ width: "24px", height: "24px", fill: "#FFFFFF66" }}
            />
            <Field
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Confirm Password"
            />
          </div>
          <ErrorMessage
            name="confirmPassword"
            component="div"
            className={styles.error}
          />
          <PasswordStrengthIndicator />
          <button className={styles.register} type="submit">
            REGISTER
          </button>
          <button
            className={styles.login}
            type="button"
            onClick={() => navigate("/login")}
          >
            LOG IN
          </button>
        </Form>
      </Formik>
    </div>
  );
}
