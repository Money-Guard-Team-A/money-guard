import { Link } from "react-router-dom";
import css from "./NotFound.module.css";

const NotFound = () => {
  return (
    <div className={css.wrapper}>
      <div className={css.container}>
        <h1 className={css.title}>404</h1>
        <p className={css.message}>
          Oops! The page you're looking for doesn't exist.
        </p>
        <Link to="/" className={css.button}>
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
