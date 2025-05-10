import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { Field, Form, Formik } from "formik";
import { register } from "../../redux/auth/operations";
import { useNavigate } from "react-router-dom";
import styles from "./RegistrationForm.module.css";
import Icon from "../../assets/Icons";

export default function RegistrationPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialValues = {
    username: "",
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    username: Yup.string().required("İsim zorunludur"),
    email: Yup.string()
      .email("Geçerli email giriniz")
      .required("Email zorunludur"),
    password: Yup.string()
      .min(6, "Şifre en az 6 karakter olmalıdır")
      .max(12, "Şifre en fazla 12 karakter olmalıdır")
      .required("Zorunludur!"),
  });

  const registerSubmit = (values) => {
    dispatch(register(values));
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
          <div className={styles.mailSection}>
            <Icon
              id="#icon-email"
              className={styles.email}
              style={{ width: "24px", height: "24px", fill: "#FFFFFF66" }}
            />
            <Field
              type="email"
              id="email"
              name="email"
              placeholder="E-mail"
            />
          </div>
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
