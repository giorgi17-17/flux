import styles from '../../styles/footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.branding}>
          <h1>FLUX</h1>
          <button className={styles.donateButton}>DONATE FROM YOUR HEART</button>
        </div>
        <nav className={styles.navSection}>
          <div className={styles.navColumn}>
            <h2>TAKE ACTION</h2>
            <ul>
              <li>Creat wotkout plan</li>
              {/* Add other list items here */}
            </ul>
          </div>
          <div className={styles.navColumn}>
            <h2>LEARN</h2>
            <ul>
              <li>How to loose weight healthy way</li>
              <li>How to loose weight healthy way</li>
              <li>How to loose weight healthy way</li>
              <li>How to loose weight healthy way</li>
              <li>How to loose weight healthy way</li>
              {/* Add other list items here */}
            </ul>
          </div>
          <div className={styles.navColumn}>
            <h2>CONNECT</h2>
            <ul>
              <li>Contact Us</li>
              <li>(402) 441-8258</li>
            </ul>
          </div>
        </nav>
      </div>
      <div className={styles.footerBottom}>
        <span>Socials</span>
        <span>©2023 All Right Resereved</span>
        <span>Design by FLUX team</span>
      </div>
    </footer>
  );
};

export default Footer;
