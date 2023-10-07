import { Link } from "react-router-dom";
import styles from "../../styles/header.module.css"; // Make sure you import the correct CSS file
import { useAuth } from "../../context/useAuth";

const Header = () => {
  const { currentUser,logOut } = useAuth();
console.log(currentUser)
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <Link className={styles.link} to={"/"}>
            Flux
          </Link>
        </div>
        <ul className={styles.navbarNav}>
          <li className={styles.navItem}>
            <Link className={styles.navlink} to={"/workouts"}>
              Workouts
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link className={styles.navlink} to={"/meals"}>
              Meals
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link className={styles.navlink} to={"/questions"}>
              questions
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
            <button onClick={logOut} className={styles.signIn}>Log Out</button>
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
    </header>
  );
};

export default Header;
