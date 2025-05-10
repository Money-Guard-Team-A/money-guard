import { Field, Form, Formik } from "formik";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { login } from "../../redux/auth/operations";
import { useNavigate } from "react-router-dom";
import styles from "./LoginForm.module.css";
import Icon from "../../assets/Icons";

export default function LoginForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Geçerli e-mail giriniz")
      .required("Zorunlu Alan"),
    password: Yup.string()
      .min(6, "Şifre en az 6 karakter olmalıdır")
      .max(12, "Şifre en fazla 12 karakter olmalıdır")
      .required("Zorunlu Alan"),
  });

  const loginSubmit = (values) => {
    dispatch(login(values));
  };

  return (
    <div className={styles.loginForm}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={loginSubmit}
      >
        <Form className={styles.form}>
          <div className={styles.mailSection}>
            <Icon
              id="#icon-email"
              className={styles.email}
              style={{ width: "24px", height: "24px", fill: "#FFFFFF66" }}
            />
            <Field type="email" name="email" id="email" placeholder="E-mail" />
          </div>
          <div className={styles.passwordSection}>
            <Icon
              id="#icon-lock"
              className={styles.lock}
              style={{ width: "24px", height: "24px", fill: "#FFFFFF66" }}
            />
            <Field
              type="password"
              name="password"
              id="password"
              placeholder="Password"
            />
          </div>
          <button className={styles.login} type="submit">
            LOG IN
          </button>
          <button
            className={styles.register}
            type="button"
            onClick={() => navigate("/register")}
          >
            REGISTER
          </button>
        </Form>
      </Formik>
    </div>
  );
}
