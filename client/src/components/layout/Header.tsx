import { Link } from "react-router-dom";
import styles from "../../styles/header.module.css"; // Make sure you import the correct CSS file
import { useAuth } from "../../context/useAuth";
import { useEffect, useState } from "react";
import HeaderMobileComponent from "./HeaderMobileComponent";

const Header = () => {
  const { currentUser, logOut } = useAuth();
  const [windowSize, setWindowSize] = useState({ width: 0 });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
      });
    }

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <header className={styles.header}>
      <div className={styles.beta}>
        You can use this webiste for free while it is on BETA version
      </div>
      {windowSize.width > 800 ? (
        <div>
          <div className={styles.container}>
            <div className={styles.logo}>
              <Link className={styles.link} to={"/"}>
                Flux
              </Link>
            </div>
            <ul className={styles.navbarNav}>
              {/* <li className={styles.navItem}>
                <Link className={styles.navlink} to={"/workouts"}>
                  Workouts
                </Link>
              </li> */}
              <li className={styles.navItem}>
                <Link className={styles.navlink} to={"/meals"}>
                  Meals
                </Link>
              </li>
              {/* <li className={styles.navItem}>
                <Link className={styles.navlink} to={"/questions"}>
                  questions
                </Link>
              </li> */}
              {/* <li className={styles.navItem}>
                <Link className={styles.navlink} to={"/adminDashboard"}>
                  adminDashboard
                </Link>
              </li> */}
              <li className={styles.navItem}>
                <Link className={styles.navlink} to={"/plan"}>
                  Plan
                </Link>
              </li>
              <li className={styles.navItem}>
                <Link className={styles.navlink} to={"/pricing"}>
                  Pricing
                </Link>
              </li>
              {/* Add more navigation links as needed */}
            </ul>
            {currentUser ? (
              <div>
                <button onClick={logOut} className={styles.signIn}>
                  Log Out
                </button>
              </div>
            ) : (
              <div>
                <div className={styles.buttons}>
                  <Link className={styles.navlink} to={"/signIn"}>
                    <button className={styles.signIn}>Sign In</button>
                  </Link>
                  <Link className={styles.navlink} to={"/register"}>
                    <button className={styles.register}>Register</button>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div>
          <HeaderMobileComponent />
        </div>
      )}
    </header>
  );
};

export default Header;
