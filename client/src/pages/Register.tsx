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

const Register = () => {
  const { createUser } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const id = localStorage.getItem("myCustomId");

  const signInWithGoogle = async () => {
    try {
      const data = await signInWithPopup(auth, provider);
      const googleEmail = data.user.email || "";
      console.log(googleEmail);
      // localStorage.setItem("email", googleEmail);
      const emailExists = localStorage.getItem("email");
      if (emailExists) {
        const response = await fetch(`${BACKEND_URL}/api/register`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ _id: id, email: googleEmail }),
        });
        console.log(response);
      }
      navigate("/plan");
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const handleRegister = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsLoading(true);
    // localStorage.setItem("email", email);

    try {
      await createUser({ email, password });
      const response = await fetch(`${BACKEND_URL}/api/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ _id: id, email }),
      });
      console.log(response);
      navigate("/");
      console.log("ok");
      console.log("user created");
      setIsLoading(false);
    } catch (error) {
      console.log("loading false");
      const errorMessage = (error as Error).message;
      console.log(errorMessage);

      if (errorMessage === "Firebase: Error (auth/invalid-email).") {
        toast.error("იმეილი ან პაროლი არასწორია", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          onClose: () => setIsLoading(false),
        });
      } else if (errorMessage === "Firebase: Error (auth/user-not-found).") {
        toast.error("მომხმარებელი ვერ მოიძებნა", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          onClose: () => setIsLoading(false),
        });
      } else if (
        errorMessage === "Firebase: Error (auth/email-already-in-use)."
      ) {
        toast.error("ემაილი გამოყენებულია", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          onClose: () => setIsLoading(false),
        });
      } else if (
        errorMessage ===
        "Firebase: Password should be at least 6 characters (auth/weak-password)."
      ) {
        toast.error("პაროლი უნდა შეიცავდეს 6 სიმბოლოზე მეტს", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          onClose: () => setIsLoading(false),
        });
      }
    }
  };

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
            <p className={styles.title}>Register</p>
            <form className={styles.form}>
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
              <button className={styles.sign} onClick={handleRegister}>
                Register
              </button>
            </form>
            <div className={styles.socialMessage}>
              <div className={styles.line}></div>
              <p className={styles.message}>Register with social accounts</p>
              <div className={styles.line}></div>
            </div>
            <div className={styles.socialIcons}>
              <button aria-label="Log in with Google" className={styles.icon}>
                <FcGoogle
                  onClick={signInWithGoogle}
                  className={styles.google}
                />
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
      )}
    </div>
  );
};

export default Register;
