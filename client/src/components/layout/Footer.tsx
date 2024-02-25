import styles from "../../styles/footer.module.css";
import { FaFacebook, FaInstagram } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.header}> 
        <p>Workout Plan</p>
        <p>Prepeared Meals</p>
        <p>Contact</p>
        <p>Company</p>
      </div>
      <div className={styles.logo}>
        <h1>
          Flux
          <span className={styles.it}>it</span>
        </h1>
      </div>
      <div className={styles.socials}>
        <FaFacebook size={"1.5rem"} />
        <FaInstagram size={"1.5rem"} />
      </div>
    </footer>
  );
};

export default Footer;
