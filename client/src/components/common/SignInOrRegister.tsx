import { Link } from "react-router-dom";
import styles from "../../styles/signInOrRegister.module.css";

const SignInOrRegister = () => {
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h1>You need to sign in or register to see a workout plan</h1>
      </div>
      <div className={styles.buttons}>
        <button className={styles.register}>
          <Link className={styles.registerLink} to={"/register"}>
            Register
          </Link>
        </button>
        <button className={styles.signIn}>
          <Link className={styles.signInLink} to={"/signIn"}>
            Sign In
          </Link>
        </button>
      </div>
    </div>
  );
};

export default SignInOrRegister;
