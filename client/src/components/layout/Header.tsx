import { Link } from "react-router-dom";
import styles from "../../styles/header.module.css"; // Make sure you import the correct CSS file

const Header = () => {
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
            <Link className={styles.navlink} to={"/programs"}>
              Programs
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link className={styles.navlink} to={"/pricing"}>
              Pricing
            </Link>
          </li>
          {/* Add more navigation links as needed */}
        </ul>
        <div className={styles.buttons}>
          <button className={styles.signIn}>Sign In</button>
          <button className={styles.register}>Register</button>
        </div>
      </div>
    </header>
  );
};

export default Header;
