import styles from "../../styles/programCards.module.css";
import { IconType } from "react-icons";

type Card = {
  icon: IconType;
  text: string;
  description: string;
};

const ProgramCards = ({ icon, text, description }: Card) => {
  const IconComponent = icon;

  return (
    <div className={styles.container}>
      <div className={styles.icon}>
        <IconComponent size={30} />
      </div>
      <div className={styles.text}>{text}</div>
      <div className={styles.description}>{description}</div>
    </div>
  );
};

export default ProgramCards;
