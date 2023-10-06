import { Link } from "react-router-dom";
import styles from "../styles/signIn.module.css";
import { FcGoogle } from "react-icons/fc";

import { auth, provider } from "../firebase/firebase";
// import { provider } from
import { signInWithPopup } from "firebase/auth";
import { useState } from "react";

const SignIn = () => {
  const [value, setValue] = useState("");

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider).then((data) => {
      setValue(data.user.email || "");
    });
  };
  console.log(value);

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <p className={styles.title}>Login</p>
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
          <p className={styles.message}>Login with social accounts</p>
          <div className={styles.line}></div>
        </div>
        <div className={styles.socialIcons}>
          <button aria-label="Log in with Google" className={styles.icon}>
            <FcGoogle size={"5rem"} onClick={signInWithGoogle} />
          </button>
        </div>
        <p className={styles.signup}>
          Don't have an account?
          <Link className={styles.signupLink} to={"/register"}>
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
