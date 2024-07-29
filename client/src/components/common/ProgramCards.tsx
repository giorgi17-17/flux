import styles from "../../styles/programCards.module.css";
import { IconType } from "react-icons";

type Card = {
  icon: IconType;
  text: string;
  description: string;
  image: string;
  buttonText: string;
};

const ProgramCards = ({ image,buttonText, text, description }: Card) => {
  // const IconComponent = icon;

  return (
    <div className={styles.container}>
      {/* <div className={styles.icon}>
        <IconComponent size={30} />
      </div> */}
      <div className={styles.image}>
        <img src={image} alt="fsd" />
      </div>
      <div className={styles.allText}>
        <div className={styles.text}>{text}</div>
        <div className={styles.description}>{description}</div>
        <button className={styles.buttonText}>{buttonText}</button>
      </div>
    </div>
  );
};

export default ProgramCards;
