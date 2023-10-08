import { Link, useNavigate } from "react-router-dom";
import styles from "../styles/signIn.module.css";
import { FcGoogle } from "react-icons/fc";

import { useState } from "react";
import { useAuth } from "../context/useAuth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase/firebase";

const SignIn = () => {
  const { userValue, signIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [val, setVal] = useState("");
  const id = localStorage.getItem("myCustomId");

  const navigate = useNavigate();

  const signInWithGoogle = async () => {
    try {
      const data = await signInWithPopup(auth, provider);
      const googleEmail = data.user.email || "";
      console.log(googleEmail);
      localStorage.setItem("email", googleEmail);

      if (id) {
        try {
          const response = await fetch(
            "http://localhost:5000/api/registerOrUpdate",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ _id: id, email: googleEmail }), // use googleEmail here
            }
          );

          if (!response.ok) {
            const data = await response.json();
            console.error(data.message);
          }
          navigate("/");
          console.log('try')
        } catch (error) {
          console.error("An error occurred:", error);
        }
      } else if (id === "noId") {
        console.error("ID not found in local storage");
      }
    } catch (error) {
      console.error("An error occurred: ", error);
    }
  };

  const handleSignInClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      await signIn({ email, password });
      navigate("/");
    } catch (error) {
      const errorMessage = (error as Error).message;
      console.log(errorMessage);
      if (errorMessage === "Firebase: Error (auth/invalid-email).") {
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
  );
};

export default SignIn;
