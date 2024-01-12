import { Link, useNavigate } from "react-router-dom";
import styles from "../styles/signIn.module.css";
import { FcGoogle } from "react-icons/fc";

import { useState } from "react";
import { useAuth } from "../context/useAuth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase/firebase";
import { BACKEND_URL } from "../services/helper";
import Loading from "../components/common/Loading";

const SignIn = () => {
  const { userValue, signIn } = useAuth();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [password, setPassword] = useState("");
  const id = localStorage.getItem("myCustomId");

  const navigate = useNavigate();
  const signInWithGoogle = async () => {
    const formData = JSON.parse(localStorage.getItem("formData") || "false");

    if (formData) {
      try {
        const data = await signInWithPopup(auth, provider);
        const googleEmail = data.user.email || "";
        console.log(googleEmail);
        localStorage.setItem("email", googleEmail);

        const response = await fetch(`${BACKEND_URL}/api/update`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ _id: id, formData, email: googleEmail }),
        });
        console.log(response);
        navigate("/plan");

        console.log("user updated");
      } catch (error) {
        console.error("An error occurred:", error);
      }
    } else {
      try {
        const data = await signInWithPopup(auth, provider);
        const googleEmail = data.user.email || "";
        console.log(googleEmail);
        localStorage.setItem("email", googleEmail);

        const response = await fetch(`${BACKEND_URL}/api/register`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ _id: id, email: googleEmail }),
        });
        console.log(response);
        navigate("/plan");
        console.log("ok");
        console.log("user created");
      } catch (error) {
        console.error("An error occurred:", error);
      }
      console.error(id, "id rom register");
    }
  };
  const handleSignInClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await signIn({ email, password });
      setIsLoading(false);

      navigate("/");
    } catch (error) {
      const errorMessage = (error as Error).message;
      console.log(errorMessage);
      setIsLoading(false);

      if (
        errorMessage === "Firebase: Error (auth/invalid-email)." ||
        errorMessage === "auth/invalid-login-credentials"
      ) {
        // Show toast
        toast.error("Invalid email or password", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      } else if (errorMessage === "Firebase: Error (auth/user-not-found).") {
        toast.error("User not found", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }
      console.error("Failed to sign in", error);
    }
  };

  console.log(userValue);

  return (
    <div className={styles.container}>
      <ToastContainer />
      {isLoading ? (
        <div className={styles.loading}>
          <Loading />
        </div>
      ) : (
        <div>
          <div className={styles.formContainer}>
            <p className={styles.title}>Login</p>
            <div className={styles.form}>
              <div className={styles.inputGroup}>
                <label>Email</label>
                <input
                  type="text"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className={styles.inputGroup}>
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                />
                <div className={styles.forgot}>
                  {/* <a rel="noopener noreferrer" href="#">
                Forgot Password ?
              </a> */}
                </div>
              </div>
              <button className={styles.sign} onClick={handleSignInClick}>
                Sign in
              </button>
            </div>
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
      )}
    </div>
  );
};

export default SignIn;
