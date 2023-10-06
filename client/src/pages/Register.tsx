import { Link } from "react-router-dom";
import styles from "../styles/signIn.module.css";
import { FcGoogle } from "react-icons/fc";

const Register = () => {
  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <p className={styles.title}>Register</p>
        <form className={styles.form}>
          <div className={styles.inputGroup}>
            <label>Username</label>
            <input type="text" name="username" />
          </div>
          <div className={styles.inputGroup}>
            <label>Password</label>
            <input type="password" name="password" />
            <div className={styles.forgot}>
              {/* <a rel="noopener noreferrer" href="#">
                Forgot Password ?
              </a> */}
            </div>
          </div>
          <button className={styles.sign}>Sign in</button>
        </form>
        <div className={styles.socialMessage}>
          <div className={styles.line}></div>
          <p className={styles.message}>Register with social accounts</p>
          <div className={styles.line}></div>
        </div>
        <div className={styles.socialIcons}>
          <button aria-label="Log in with Google" className={styles.icon}>
            <FcGoogle className={styles.google} />
          </button>
        </div>
        <p className={styles.signup}>
          Have an account?
          <Link className={styles.signupLink} to={"/SignIn"}>
            Sign IN
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
