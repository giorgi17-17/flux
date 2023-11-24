import styles from "../../styles/loading.module.css";

const Loading = () => {
  return (
    <div className={styles.loader}>
      <div className={styles.container}>
        <div className={styles.carousel}>
          <div className={styles.love}></div>
          <div className={styles.love}></div>
          <div className={styles.love}></div>
          <div className={styles.love}></div>
          <div className={styles.love}></div>
          <div className={styles.love}></div>
          <div className={styles.love}></div>
        </div>
      </div>
      <div className={styles.container}>
        <div className={styles.carousel}>
          <div className={styles.death}></div>
          <div className={styles.death}></div>
          <div className={styles.death}></div>
          <div className={styles.death}></div>
          <div className={styles.death}></div>
          <div className={styles.death}></div>
          <div className={styles.death}></div>
        </div>
      </div>
      <div className={styles.container}>
        <div className={styles.carousel}>
          <div className={styles.robots}></div>
          <div className={styles.robots}></div>
          <div className={styles.robots}></div>
          <div className={styles.robots}></div>
          <div className={styles.robots}></div>
          <div className={styles.robots}></div>
          <div className={styles.robots}></div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
