import { Link } from "react-router-dom";
import styles from "../../styles/signInOrRegister.module.css";

const SignInOrRegister = () => {
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h1>You need to sign in or register to see a workout plan</h1>
      </div>
      <div className={styles.buttons}>
        <Link className={styles.registerLink} to={"/register"}>
          <button className={styles.register}>Register</button>
        </Link>
        <Link className={styles.signInLink} to={"/signIn"}>
          <button className={styles.signIn}>Sign In</button>
        </Link>
      </div>
    </div>
  );
};

export default SignInOrRegister;
