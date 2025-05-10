import { SyncLoader } from "react-spinners";
import styles from "./Loader.module.css";

const Loader = ({ size = 15, color = "#646cff" }) => {
  return (
    <div className={styles.loaderWrapper}>
      <SyncLoader size={size} color={color} />
    </div>
  );
};

export default Loader;
